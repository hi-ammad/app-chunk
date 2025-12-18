import { Router } from "express";
import {
  createGalleryMedia,
  deleteGalleryMedia,
  getAllGalleryMedias,
  getSingleGalleryMedia,
  updateGalleryMedia,
} from "@/service/gallery_media.service";
import { mediaUpload, routeWdVersion } from '@/library/utils';
import multerToBody from "@/middleware/multer.to.body.ts";

const router = Router();

router
  .route(routeWdVersion("gallery/media"))
  .post(mediaUpload.single('image'), multerToBody, createGalleryMedia)
  .get(getAllGalleryMedias);

router
  .route(routeWdVersion("gallery/media/:id"))
  .get(getSingleGalleryMedia)
  .patch(
    mediaUpload.single('image'), multerToBody,
    updateGalleryMedia,
  )
  .delete(
    deleteGalleryMedia,
  );

export default router;
