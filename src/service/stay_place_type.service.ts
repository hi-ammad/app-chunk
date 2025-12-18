import { StayPlaceType } from "@/modal";
import { createStayPlaceTypeJoi, updateStayPlaceTypeJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createStayPlaceType = handleFactory.createOne(StayPlaceType, createStayPlaceTypeJoi, true);

export const getSingleStayPlaceType = handleFactory.getOne(StayPlaceType);

export const getAllStayPlaceTypes = handleFactory.getAll(StayPlaceType);

export const updateStayPlaceType = handleFactory.updateOne(StayPlaceType, updateStayPlaceTypeJoi);

export const deleteStayPlaceType = handleFactory.deleteOne(StayPlaceType);
