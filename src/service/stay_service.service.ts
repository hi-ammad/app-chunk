import { StayService } from "@/modal";
import { createStayServiceJoi, updateStayServiceJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createStayService = handleFactory.createOne(StayService, createStayServiceJoi, true);

export const getSingleStayService = handleFactory.getOne(StayService);

export const getAllStayServices = handleFactory.getAll(StayService);

export const updateStayService = handleFactory.updateOne(StayService, updateStayServiceJoi);

export const deleteStayService = handleFactory.deleteOne(StayService);
