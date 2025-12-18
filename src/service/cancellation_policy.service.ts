import { CancellationPolicy } from "@/modal";
import { createCancellationPolicyJoi, updateCancellationPolicyJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createCancellationPolicy = handleFactory.createOne(CancellationPolicy, createCancellationPolicyJoi, true);

export const getSingleCancellationPolicy = handleFactory.getOne(CancellationPolicy);

export const getAllCancellationPolicys = handleFactory.getAll(CancellationPolicy);

export const updateCancellationPolicy = handleFactory.updateOne(CancellationPolicy, updateCancellationPolicyJoi);

export const deleteCancellationPolicy = handleFactory.deleteOne(CancellationPolicy);
