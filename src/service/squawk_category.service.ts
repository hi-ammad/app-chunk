import { SquawkCategory } from "@/modal";
import { createSquawkCategoryJoi, updateSquawkCategoryJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createSquawkCategory = handleFactory.createOne(SquawkCategory, createSquawkCategoryJoi, true);

export const getSingleSquawkCategory = handleFactory.getOne(SquawkCategory);

export const getAllSquawkCategorys = handleFactory.getAll(SquawkCategory);

export const updateSquawkCategory = handleFactory.updateOne(SquawkCategory, updateSquawkCategoryJoi);

export const deleteSquawkCategory = handleFactory.deleteOne(SquawkCategory);
