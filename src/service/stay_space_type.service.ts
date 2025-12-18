import { StaySpaceType } from "@/modal";
import { createStaySpaceTypeJoi, updateStaySpaceTypeJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createStaySpaceType = handleFactory.createOne(StaySpaceType, createStaySpaceTypeJoi, true);

export const getSingleStaySpaceType = handleFactory.getOne(StaySpaceType);

export const getAllStaySpaceTypes = handleFactory.getAll(StaySpaceType);

export const updateStaySpaceType = handleFactory.updateOne(StaySpaceType, updateStaySpaceTypeJoi);

export const deleteStaySpaceType = handleFactory.deleteOne(StaySpaceType);
