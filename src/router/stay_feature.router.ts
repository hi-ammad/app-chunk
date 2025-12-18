import { Router } from "express";
import {
  createStayFeature,
  deleteStayFeature,
  getAllFeatureAndSubFeatures,
  getAllStayFeatures,
  getSingleStayFeature,
  updateStayFeature,
} from "@/service/stay_feature.service";
import { routeWdVersion } from '@/library/utils';
import { multerUpload } from "@/library/multer.ts";
import multerToBody from "@/middleware/multer.to.body.ts";

const router = Router();

router
  .route(routeWdVersion("stay/feature"))
  .post(multerUpload.single('icon'), multerToBody, createStayFeature)
  .get(getAllStayFeatures);

router
  .route(routeWdVersion("stay/feature/:id"))
  .get(getSingleStayFeature)
  .patch(
    updateStayFeature,
  )
  .delete(
    deleteStayFeature,
  );

router.route(routeWdVersion("stay/feature/sub_features")).get(getAllFeatureAndSubFeatures);

export default router;
