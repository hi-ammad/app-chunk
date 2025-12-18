import { Router } from "express";
import {
  createBusinessUpload,
  deleteBusinessUpload,
  getAllBusinessUploads,
  getSingleBusinessUpload,
  updateBusinessUpload,
} from "@/service/business_upload.service";
import { mediaUpload, routeWdVersion } from '@/library/utils';
import multerToBody from "@/middleware/multer.to.body.ts";

const router = Router();

router
  .route(routeWdVersion("business/upload"))
  .post(mediaUpload.single('image'), multerToBody, createBusinessUpload)
  .get(getAllBusinessUploads);

router
  .route(routeWdVersion("business/upload/:id"))
  .get(getSingleBusinessUpload)
  .patch(
    updateBusinessUpload,
  )
  .delete(
    deleteBusinessUpload,
  );

export default router;
