import { SquawkTag } from "@/modal";
import { createSquawkTagJoi, updateSquawkTagJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createSquawkTag = handleFactory.createOne(SquawkTag, createSquawkTagJoi, true);

export const getSingleSquawkTag = handleFactory.getOne(SquawkTag);

export const getAllSquawkTags = handleFactory.getAll(SquawkTag);

export const updateSquawkTag = handleFactory.updateOne(SquawkTag, updateSquawkTagJoi);

export const deleteSquawkTag = handleFactory.deleteOne(SquawkTag);
