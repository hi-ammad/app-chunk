import { StaySurfaceType } from "@/modal";
import { createStaySurfaceTypeJoi, updateStaySurfaceTypeJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createStaySurfaceType = handleFactory.createOne(StaySurfaceType, createStaySurfaceTypeJoi, true);

export const getSingleStaySurfaceType = handleFactory.getOne(StaySurfaceType);

export const getAllStaySurfaceTypes = handleFactory.getAll(StaySurfaceType);

export const updateStaySurfaceType = handleFactory.updateOne(StaySurfaceType, updateStaySurfaceTypeJoi);

export const deleteStaySurfaceType = handleFactory.deleteOne(StaySurfaceType);
