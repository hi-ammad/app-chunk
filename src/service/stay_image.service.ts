import { StayImage } from "@/modal";
import { createStayImageJoi, updateStayImageJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createStayImage = handleFactory.createOne(StayImage, createStayImageJoi);

export const getSingleStayImage = handleFactory.getOne(StayImage);

export const getAllStayImages = handleFactory.getAll(StayImage);

export const updateStayImage = handleFactory.updateOne(StayImage, updateStayImageJoi);

export const deleteStayImage = handleFactory.deleteOne(StayImage);
