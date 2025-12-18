import { Review } from "@/modal";
import { createReviewJoi, updateReviewJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createReview = handleFactory.createOne(Review, createReviewJoi);

export const getSingleReview = handleFactory.getOne(Review);

export const getAllReviews = handleFactory.getAll(Review);

export const updateReview = handleFactory.updateOne(Review, updateReviewJoi);

export const deleteReview = handleFactory.deleteOne(Review);
