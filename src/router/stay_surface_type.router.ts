import { Router } from "express";
import {
  createStaySurfaceType,
  deleteStaySurfaceType,
  getAllStaySurfaceTypes,
  getSingleStaySurfaceType,
  updateStaySurfaceType,
} from "@/service/stay_surface_type.service";
import { routeWdVersion } from '@/library/utils';

const router = Router();

router
  .route(routeWdVersion("stay/surface-type"))
  .post(createStaySurfaceType)
  .get(getAllStaySurfaceTypes);

router
  .route(routeWdVersion("stay/surface-type/:id"))
  .get(getSingleStaySurfaceType)
  .patch(
    updateStaySurfaceType,
  )
  .delete(
    deleteStaySurfaceType,
  );

export default router;
