import { Router } from "express";
import {
  createStayImage,
  deleteStayImage,
  getAllStayImages,
  getSingleStayImage,
  updateStayImage,
} from "@/service/stay_image.service.ts";
import { mediaUpload, routeWdVersion } from '@/library/utils';
import multerToBody from "@/middleware/multer.to.body.ts";

const router = Router();

router
  .route(routeWdVersion("stay/image"))
  .post(mediaUpload.single('image'), multerToBody, createStayImage)
  .get(getAllStayImages);

router
  .route(routeWdVersion("stay/image/:id"))
  .get(getSingleStayImage)
  .patch(
    mediaUpload.single('image'), multerToBody,
    updateStayImage,
  )
  .delete(
    deleteStayImage,
  );

export default router;
