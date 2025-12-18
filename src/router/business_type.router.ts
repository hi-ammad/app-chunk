import { Router } from "express";
import {
  createBusinessType,
  deleteBusinessType,
  getAllBusinessTypes,
  getSingleBusinessType,
  updateBusinessType,
} from "@/service/business_type.service";
import { routeWdVersion } from '@/library/utils';

const router = Router();

router
  .route(routeWdVersion("business/type/"))
  .post(createBusinessType)
  .get(getAllBusinessTypes);

router
  .route(routeWdVersion("business/type/:id"))
  .get(getSingleBusinessType)
  .patch(
    updateBusinessType,
  )
  .delete(
    deleteBusinessType,
  );

export default router;
