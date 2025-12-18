import { Router } from "express";
import {
  createSquawk,
  deleteSquawk,
  getAllSquawks,
  getSingleSquawk,
  updateSquawk,
} from "@/service/squawk.service.ts";
import { mediaUpload, routeWdVersion } from '@/library/utils';
import multerToBody from "@/middleware/multer.to.body.ts";

const router = Router();

router
  .route(routeWdVersion("squawk"))
  .post(mediaUpload.single('cover_image'), multerToBody, createSquawk)
  .get(getAllSquawks);

router
  .route(routeWdVersion("squawk/:id"))
  .get(getSingleSquawk)
  .patch(
    updateSquawk,
  )
  .delete(
    deleteSquawk,
  );

export default router;
