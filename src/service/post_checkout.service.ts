import { PostCheckout } from "@/modal";
import { createPostCheckOutJoi, updatePostCheckOutJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createPostCheckout = handleFactory.createOne(PostCheckout, createPostCheckOutJoi, true);

export const getSinglePostCheckout = handleFactory.getOne(PostCheckout);

export const getAllPostCheckouts = handleFactory.getAll(PostCheckout);

export const updatePostCheckout = handleFactory.updateOne(PostCheckout, updatePostCheckOutJoi);

export const deletePostCheckout = handleFactory.deleteOne(PostCheckout);
