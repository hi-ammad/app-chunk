import { Business } from "@/modal";
import { createBusinessJoi, updateBusinessJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createBusiness = handleFactory.createOne(Business, createBusinessJoi, true);

export const getSingleBusiness = handleFactory.getOne(Business);

export const getAllBusinesss = handleFactory.getAll(Business);

export const updateBusiness = handleFactory.updateOne(Business, updateBusinessJoi);

export const deleteBusiness = handleFactory.deleteOne(Business);

export const getWithInBusiness = handleFactory.getDocsWithIn(Business, 'address.location');
