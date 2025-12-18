import { createStayJoi, updateStayJoi } from "@/validation";
import handleFactory from "./handle.service";
import catchAsync from "@/library/catch_async";
import { Stay, StayCalendar } from "@/modal";
import { Request, Response } from "express";
import { Model } from "mongoose";
import APIFeatures from "@/library/api_features";

export const createStay = handleFactory.createOne(Stay, createStayJoi, true);

export const getSingleStay = handleFactory.getOne(Stay);

/* export const getAllStays = handleFactory.getAll(Stay);*/

export const deleteStay = handleFactory.deleteOne(Stay);

export const updateStay = handleFactory.updateOne(Stay, updateStayJoi);

export const getWithinStays = handleFactory.getDocsWithIn(Stay, "address.location");

function computeAvailableSegments(rangeStart: Date, rangeEnd: Date, blocked: Array<{ start: Date; end: Date }>) {
  if (!(rangeStart instanceof Date) || !(rangeEnd instanceof Date) || rangeStart >= rangeEnd) return [];

  // Keep only overlaps with requested range and normalize to [start,end] inside the window
  const overlapped = blocked
    .filter(b => b.start && b.end && b.start < rangeEnd && b.end > rangeStart)
    .map(b => ({
      start: new Date(Math.max(rangeStart.getTime(), new Date(b.start).getTime())),
      end:   new Date(Math.min(rangeEnd.getTime(),   new Date(b.end).getTime())),
    }))
    .filter(b => b.start < b.end);

  if (!overlapped.length) return [{ start: rangeStart, end: rangeEnd }];

  // Sort & merge blocked intervals
  overlapped.sort((a, b) => a.start.getTime() - b.start.getTime());
  const merged: Array<{ start: Date; end: Date }> = [];
  for (const cur of overlapped) {
    const last = merged[merged.length - 1];
    if (!last || cur.start > last.end) merged.push({ ...cur });
    else if (cur.end > last.end) last.end = cur.end;
  }

  // Now subtract merged blocks from [rangeStart, rangeEnd]
  const avail: Array<{ start: Date; end: Date }> = [];
  let cursor = rangeStart;
  for (const b of merged) {
    if (cursor < b.start) avail.push({ start: cursor, end: b.start });
    if (b.end > cursor) cursor = b.end;
  }
  if (cursor < rangeEnd) avail.push({ start: cursor, end: rangeEnd });
  return avail;
}

function extractBlocksFromCalendar(cal: any): Array<{ start: Date; end: Date }> {
  const blocks: Array<{ start: Date; end: Date }> = [];

  // Common pattern: block_dates: [{ start: Date, end: Date }, ...]
  if (Array.isArray(cal?.block_dates)) {
    for (const bd of cal.block_dates) {
      if (bd?.start && bd?.end) blocks.push({ start: new Date(bd.start), end: new Date(bd.end) });
      // If your schema uses other names (e.g. from/to, start_date/end_date), map them here:
      if (bd?.start_date && bd?.end_date) blocks.push({ start: new Date(bd.start_date), end: new Date(bd.end_date) });
      if (bd?.from && bd?.to) blocks.push({ start: new Date(bd.from), end: new Date(bd.to) });
    }
  }

  // Fallback: if calendar doc itself has start/end
  if (cal?.start && cal?.end) blocks.push({ start: new Date(cal.start), end: new Date(cal.end) });

  return blocks;
}

// Get All stays with filters
export const getAllStays = catchAsync(async (req: Request, res: Response) => {
  const startStr = (req.query.startDate as string);
  const endStr   = (req.query.endDate as string);
  const hasWindow = !!(startStr && endStr);

  const start = hasWindow ? new Date(startStr!) : null;
  const end   = hasWindow ? new Date(endStr!)   : null;

  if (hasWindow && (isNaN(+start!) || isNaN(+end!) || start! >= end!)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid date range. Provide valid ISO dates with start < end.",
    });
  }

  // if start & end dates have some window
  let blockedStayIds: string[] = [];
  if (hasWindow) {
    // Any StayCalendar with type=0 (blocked) whose block_dates overlap the requested window
    blockedStayIds = await StayCalendar.distinct("stay", {
      type: 0,
      $or: [
        {
          block_dates: {
            $elemMatch: {
              // Overlap logic: block.start < end && block.end > start
              $or: [
                { $and: [{ start: { $lt: end } }, { end: { $gt: start } }] },
                { $and: [{ start_date: { $lt: end } }, { end_date: { $gt: start } }] }              ],
            },
          },
        },
        // For single-range per document
        { $and: [{ start: { $lt: end } }, { end: { $gt: start } }] },
      ],
    } as any);

  }

  // Build your normal features query, but exclude blocked stays if we have a window
  const baseFind: any = {};
  if (hasWindow && blockedStayIds.length) {
    baseFind._id = { $nin: blockedStayIds };
  }

  const features = new APIFeatures(Stay.find(baseFind).cache({}), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  let query = features.query;

  /** Populate (same as your original) */
  const { populate } = req.query;
  if (populate) query = query.populate(JSON.parse(populate as string));

  /** Cache key comment */
  query.comment(JSON.stringify({ query: "*", ...req.query }));

  const docs = await query;

  // If a window was requested, compute available sub-ranges for each stay (based on *blocked* calendars only)
  if (hasWindow && docs?.length) {
    const stayIds = docs.map((d: any) => d._id);

    // Load only blocked calendars that overlap window, for the returned stays
    const calDocs = await StayCalendar.find({
      stay: { $in: stayIds },
      type: 0,
      $or: [
        { block_dates: { $elemMatch: { $or: [
          { $and: [{ start: { $lt: end } }, { end: { $gt: start } }] },
          { $and: [{ start_date: { $lt: end } }, { end_date: { $gt: start } }] },
          { $and: [{ from: { $lt: end } }, { to: { $gt: start } }] },
        ] } } },
        { $and: [{ start: { $lt: end } }, { end: { $gt: start } }] },
      ],
    }).select("stay block_dates start end type").lean();

    const blocksByStay = new Map<string, Array<{ start: Date; end: Date }>>();
    for (const cal of calDocs) {
      const sid = String(cal.stay);
      const arr = blocksByStay.get(sid) ?? [];
      arr.push(...extractBlocksFromCalendar(cal));
      blocksByStay.set(sid, arr);
    }

    // Attach availability info per doc
    for (const d of docs as any[]) {
      const sid = String(d._id);
      const blocked = blocksByStay.get(sid) ?? [];
      const available_segments = computeAvailableSegments(start!, end!, blocked);
      d.availability = {
        requested_range: { start, end },
        available_segments, // [{start, end}, ...]
      };
    }
  }

  res.status(200).json({
    status: "success",
    results: docs?.length,
    data: {
      fromCache: (query as any).isCached,
      docs,
    },
  });
});


export const getAllStatesAndCities = catchAsync(async (req, res, next) => {
  const stays = await Stay.find();
    // .select("address.state address.city")
    // .lean();
  const cities = [...new Set(stays.map(stay => stay.address?.city))]
    .filter(city => city)
    .map(city => ({ name: city, type: "city" }));

  const states = [...new Set(stays.map(stay => stay.address?.state))]
    .filter(state => state)
    .map(state => ({ name: state, type: "state" }));

  res.status(200).json({
    status: 'success',
    data: {
      all: [...states, ...cities],
      states,
      cities
    }
  });
});
