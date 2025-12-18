import { Router } from "express";
import {
  createStay,
  deleteStay,
  getAllStays,
  getSingleStay,
  updateStay,
  getWithinStays,
  getAllStatesAndCities
} from "@/service/stay.service.ts";

import { mediaUpload, routeWdVersion } from '@/library/utils';
import { stayMulterToBody } from "@/middleware/multer.to.body";


const router = Router();

router.route(routeWdVersion("stay/states-and-cities")).get(getAllStatesAndCities);

router
  .route(routeWdVersion("stay/"))
  .post(mediaUpload.any(), stayMulterToBody, createStay)
  .get(getAllStays);

router
  .route(routeWdVersion("stay/:id"))
  .patch(
    updateStay,
  )
  .delete(
    deleteStay,
  )
  .get(getSingleStay);

router.route(routeWdVersion("stay/within/:distance/center/:lnglat/:unit")).get(getWithinStays);

export default router;
