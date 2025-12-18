import { StayCalendar } from "@/modal";
import { createStayCalendarJoi, updateStayCalendarJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createStayCalendar = handleFactory.createOne(StayCalendar, createStayCalendarJoi, true);

export const getSingleStayCalendar = handleFactory.getOne(StayCalendar);

export const getAllStayCalendars = handleFactory.getAll(StayCalendar);

export const updateStayCalendar = handleFactory.updateOne(StayCalendar, updateStayCalendarJoi);

export const deleteStayCalendar = handleFactory.deleteOne(StayCalendar);
