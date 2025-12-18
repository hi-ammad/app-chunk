
import { StayExtraService } from "@/modal";
import { createStayExtraServiceJoi, updateExtraServiceJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createStayExtraService = handleFactory.createOne(StayExtraService, createStayExtraServiceJoi, true);

export const getSingleStayExtraService = handleFactory.getOne(StayExtraService);

export const getAllStayExtraServices = handleFactory.getAll(StayExtraService);

export const updateStayExtraService = handleFactory.updateOne(StayExtraService, updateExtraServiceJoi);

export const deleteStayExtraService = handleFactory.deleteOne(StayExtraService);
