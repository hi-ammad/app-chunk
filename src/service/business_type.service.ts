import { BusinessType } from "@/modal";
import { createBusinessTypeJoi, updateBusinessTypeJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createBusinessType = handleFactory.createOne(BusinessType, createBusinessTypeJoi, true);

export const getSingleBusinessType = handleFactory.getOne(BusinessType);

export const getAllBusinessTypes = handleFactory.getAll(BusinessType);

export const updateBusinessType = handleFactory.updateOne(BusinessType, updateBusinessTypeJoi);

export const deleteBusinessType = handleFactory.deleteOne(BusinessType);
