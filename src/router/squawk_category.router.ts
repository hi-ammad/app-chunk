import { Router } from "express";
import {
  createSquawkCategory,
  deleteSquawkCategory,
  getAllSquawkCategorys,
  getSingleSquawkCategory,
  updateSquawkCategory,
} from "@/service/squawk_category.service";
import { routeWdVersion } from '@/library/utils';

const router = Router();

router
  .route(routeWdVersion("squawk/category"))
  .post(createSquawkCategory)
  .get(getAllSquawkCategorys);

router
  .route(routeWdVersion("squawk/category/:id"))
  .get(getSingleSquawkCategory)
  .patch(
    updateSquawkCategory,
  )
  .delete(
    deleteSquawkCategory,
  );

export default router;
