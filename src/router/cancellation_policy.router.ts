import { Router } from "express";
import {
  createCancellationPolicy,
  deleteCancellationPolicy,
  getAllCancellationPolicys,
  getSingleCancellationPolicy,
  updateCancellationPolicy,
} from "@/service/cancellation_policy.service";
import { routeWdVersion } from '@/library/utils';

const router = Router();

router
  .route(routeWdVersion("stay/cancellation-policy/:id"))
  .patch(
    updateCancellationPolicy,
  )
  .delete(
    deleteCancellationPolicy,
  )
  .get(getSingleCancellationPolicy);

router
  .route(routeWdVersion("stay/cancellation-policy"))
  .get(getAllCancellationPolicys)
  .post(createCancellationPolicy);

export default router;
