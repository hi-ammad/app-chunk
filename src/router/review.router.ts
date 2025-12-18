import { Router } from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getSingleReview,
  updateReview,
} from "@/service/review.service.ts";
import { routeWdVersion } from '@/library/utils';

const router = Router();

router.route(routeWdVersion("review")).post(createReview).get(getAllReviews);
router
  .route(routeWdVersion("review/:id"))
  .get(getSingleReview)
  .patch(
    updateReview,
  )
  .delete(
    deleteReview,
  );

export default router;
