
import { createSquawkJoi, updateSquawkJoi } from "@/validation";
import handleFactory from "./handle.service";
import { Squawk } from "@/modal";

export const createSquawk = handleFactory.createOne(Squawk, createSquawkJoi, true);

export const getSingleSquawk = handleFactory.getOne(Squawk);

export const getAllSquawks = handleFactory.getAll(Squawk);

export const updateSquawk = handleFactory.updateOne(Squawk, updateSquawkJoi);

export const deleteSquawk = handleFactory.deleteOne(Squawk);
