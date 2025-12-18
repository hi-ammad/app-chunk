import { SquawkComment } from "@/modal";
import { createSquawkCommentJoi, updateSquawkCommentJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createSquawkComment = handleFactory.createOne(SquawkComment, createSquawkCommentJoi, true);

export const getSingleSquawkComment = handleFactory.getOne(SquawkComment);

export const getAllSquawkComments = handleFactory.getAll(SquawkComment);

export const updateSquawkComment = handleFactory.updateOne(SquawkComment, updateSquawkCommentJoi);

export const deleteSquawkComment = handleFactory.deleteOne(SquawkComment);
