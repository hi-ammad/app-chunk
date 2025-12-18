import { BusinessUpload } from "@/modal";
import { createBusinessUploadJoi, updateBusinessUploadJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createBusinessUpload = handleFactory.createOne(BusinessUpload, createBusinessUploadJoi);

export const getSingleBusinessUpload = handleFactory.getOne(BusinessUpload);

export const getAllBusinessUploads = handleFactory.getAll(BusinessUpload);

export const updateBusinessUpload = handleFactory.updateOne(BusinessUpload, updateBusinessUploadJoi);

export const deleteBusinessUpload = handleFactory.deleteOne(BusinessUpload);
