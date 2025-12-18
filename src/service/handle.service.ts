import { Model } from "mongoose";
import type { Request, Response, NextFunction } from "express";
import catchAsync from "@/library/catch_async";
import AppError from "@/library/app_error";
import APIFeatures from "@/library/api_features";
import Joi from "joi";
import RedisCache from "@/library/redis";
import { flatten } from "@/library/utils";
import { EModalNames } from "@/enum";
import { StayCalendar } from "@/modal";
import * as Sentry from "@sentry/node";

/*  API: DELETE
 * ******************** START: */
const deleteOne = (Model: Model<any>) =>
  catchAsync(async (req: Request, res: Response) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    /** Invalidate: <Modal> Cache Docs  */
    const client = RedisCache.instance.client;
    /** 1) Getting All <MODAL> Keys */
    let extractedKeys = await client.keys(`*${Model.modelName}*`);
    /** 2) Filter Keys - < invalidate all __ getAllDocs & this specific Doc> */
    extractedKeys = extractedKeys.filter((key) => {
      const { query } = JSON.parse(key);
      return query?.query === "*" || query.id === req.params.id;
    });
    if (extractedKeys.length > 0) client.del(extractedKeys);
    Sentry.captureMessage(`Document with ID ${req.params.id} deleted from ${Model.modelName}`, {
      // model: Model.modelName,
      httpMethod: 'delete',
      documentId: req.params.id,
      userId: req.user?.id || 'Unknown',
      invalidatedCacheKeys: extractedKeys,
      timestamp: new Date().toISOString()
    });

    res.status(204).json({ doc });
  });
/* DELETE ===========================  END: */
/* API: UPDATE
 * ********************  START: */
const updateOne = (Model: Model<any>, joiSchema: Joi.ObjectSchema) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { params } = req;
    const { error } = joiSchema.validate(req.body, { abortEarly: false });
    if (error) return next(new AppError(error.message, 400));
    const doc = await Model.findByIdAndUpdate(params.id, flatten(req.body), {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(new AppError("No document found with that ID", 404));

    /** Redis Cache */
    /** Invalidate: <Modal> Cache Docs  */
    const client = RedisCache.instance.client;
    /** 1) Getting All <MODAL> Keys */
    let extractedKeys = await client.keys(`*${Model.modelName}*`);
    /** 2) Filter Keys - < invalidate all __ getAllDocs & this specific Doc>*/
    extractedKeys = extractedKeys.filter((key) => {
      const { query } = JSON.parse(key);
      return query?.query === "*" || query.id === params.id;
    });
    if (extractedKeys.length > 0) client.del(extractedKeys);
    Sentry.logger.info(`Document with ID ${params.id} updated in ${Model.modelName}`, {
      model: Model.modelName,
      httpMethod: 'patch',
      documentId: params.id,
      userId: req.user?.id || 'Unknown',
      invalidatedCacheKeys: extractedKeys,
      timestamp: new Date().toISOString()
    });
    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

/* UPDATE =========================== END: */
/* API: CREATE
 * ******************** START: */
const createOne = (
  Model: Model<any>,
  joiSchema: Joi.ObjectSchema,
  includeUserId?: boolean,
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // add - userId
    if (includeUserId) req.body.user = req.user.id;

    const { error: err } = joiSchema.validate(req.body, { abortEarly: false });
    if (err) {
      /* const message = err.message
        .split(".")
        .map((e, index) => {
          return `${index}) ${e}`;
        })
        .join("."); */
      const message = err.message;
      Sentry.logger.error("Joi Validation Error on CreateOne", {
        model: Model.modelName,
        httpMethod: 'post',
        userId: req.user?.id || 'Unknown',
        joiError: err,
        requestBody: req.body,
        timestamp: new Date().toISOString()
      });

      return next(new AppError(message, 400));
    }
    const doc = await Model.create({ ...req.body });


    if (Model.modelName === EModalNames.STAY_CALENDAR && doc) {
      await StayCalendar.findByIdAndUpdate(doc._id, {
        "$push": { "calendar": doc._id },
      });
      // If the model is StayCalendar, we need to invalidate all cache for Stay
      const client = RedisCache.instance.client;
      /** 1) Getting All <MODAL> Keys */
      let extractedKeys = await client.keys(`*${EModalNames.STAY}*`);
      /** delete cache data */
      if (extractedKeys.length > 0) await client.del(extractedKeys);
    }

    /** Redis: Invalidate Cache - ============================== START */
    const client = RedisCache.instance.client;
    /** 1) Getting All <modal> Keys */
    let extractedKeys = await client.keys(`*${Model.modelName}*`);
    /** 2) Filter Keys - < invalidate all __ getAllDocs>*/
    extractedKeys = extractedKeys.filter((key) => {
      return JSON.parse(key).query?.query === "*";
    });
    /** delete cache data */
    if (extractedKeys.length > 0) await client.del(extractedKeys);
    /** Redis Invalidate Cache - ================================ END */
    Sentry.logger.info(`New document created in ${Model.modelName}`, {
      model: Model.modelName,
      httpMethod: 'post',
      documentId: doc._id,
      userId: req.user?.id || 'Unknown',
      invalidatedCacheKeys: extractedKeys,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      timestamp: new Date().toISOString(),
      document: doc,

    });
    res.status(201).json({
      status: "success",
      data: {
        doc,
      },
    });
  });
/* CREATE ===========================  END: */
/* API: GET_ONE
 * ********************  START: */
const getOne = (Model: Model<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const features = new APIFeatures(
      Model.find({ _id: req.params.id }).cache({}),
      req.query,
    );
    let query = features.query;
    /** Populate */
    const { populate } = req.query;
    if (populate) query = query.populate(JSON.parse(populate as string));
    /** Setting Comment - Would Be Name Of Cache Key */
    query.comment(JSON.stringify({ id: req.params.id, ...req.query }));
    const doc = await query;
    if (!(doc.length > 0)) {
      return next(new AppError("No document found with that ID", 404));
    }

    Sentry.logger.info(`Document with ID ${req.params.id} retrieved from ${Model.modelName}`, {
      model: Model.modelName,
      httpMethod: 'get',
      documentId: req.params.id,
      userId: req.user?.id || 'Unknown',
      fromCache: query.isCached,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      timestamp: new Date().toISOString()
    });

    res.status(200).json({
      status: "success",
      data: {
        fromCache: query.isCached,
        doc: doc[0],
      },
    });
  });
/* GET_ONE =========================== END: */
/* API: GET_ALL
 ********************* START: */
const getAll = (Model: Model<any>) =>
  catchAsync(async (req: Request, res: Response) => {
    const features = new APIFeatures(Model.find({}).cache({}), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    let query = features.query;
    /** Populate */
    const { populate } = req.query;
    if (populate) query = query.populate(JSON.parse(populate as string));
    // if (populate) query = query.populate(populate);
    /** Setting Comment - Would Be Name Of Cache Key */
    query.comment(JSON.stringify({ query: "*", ...req.query }));
    const docs = await query;

    Sentry.logger.info(`All documents retrieved from ${Model.modelName}`, {
      model: Model.modelName,
      httpMethod: 'GET',
      userId: req.user?.id || 'Unknown',
      fromCache: query.isCached,
      totalDocuments: docs.length,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      timestamp: new Date().toISOString()
    });

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: docs?.length,
      // populate: populate ? JSON.parse(populate) : "undefined",
      data: {
        fromCache: query.isCached,
        docs,
        // docs,
      },
    });
  });
/* GET_ALL ===========================  END: */
/* API: GET_DOCS_WITH_IN
 *********************  START: */
export const getDocsWithIn = (Model: Model<any>, field = 'location') =>
  /* DEPEND - */
  catchAsync(async (req, res, next) => {
    const { distance, lnglat, unit } = req.params;
    const [lng, lat] = lnglat!.split(",");
    const radius = unit === "mi" ? +distance! / 3963.2 : +distance! / 6378.1;
    if (!lat || !lng) {
      next(
        new AppError(
          "Please provide latitude and longitude in the format long,lat.",
          400,
        ),
      );
    }
    // GEO_WITH_IN
    let docsQuery = Model.find({
      [field]: {
        $geoWithin: {
          $centerSphere: [[lng, lat], radius],
        },
      },
    });

    const features = new APIFeatures(docsQuery, req.query)
      .filter()
      .sort()
      .paginate()
      .limitFields();
    let docs = await features.query;
    res.status(200).json({
      status: "success",
      total: docs.length,
      docs,
    });
  });
/* GET_DOCS_WITH_IN ===========================  END: */
const handleFactory = {
  createOne,
  deleteOne,
  updateOne,
  getAll,
  getOne,
  getDocsWithIn,
};
export default handleFactory;
