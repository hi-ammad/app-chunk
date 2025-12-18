import { Router } from "express";
import {
  createBusiness,
  deleteBusiness,
  getAllBusinesss,
  getSingleBusiness,
  getWithInBusiness,
  updateBusiness,
} from "@/service/business.service";
import { mediaUpload, routeWdVersion } from '@/library/utils';
import { businessMulterToBody } from "@/middleware/multer.to.body.ts";

const router = Router();

router
  .route(routeWdVersion("business"))
  .post(mediaUpload.any(), businessMulterToBody, createBusiness)
  .get(getAllBusinesss);

router
  .route(routeWdVersion("business/:id"))
  .get(getSingleBusiness)
  .patch(
    updateBusiness,
  )
  .delete(
    deleteBusiness,
  );

router.route(routeWdVersion("business/within/:distance/center/:lnglat/:unit")).get(getWithInBusiness);

export default router;
