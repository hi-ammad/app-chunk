import { Router } from "express";
import {
  createPostCheckout,
  deletePostCheckout,
  getAllPostCheckouts,
  getSinglePostCheckout,
  updatePostCheckout,
} from "@/service/post_checkout.service";
import { routeWdVersion } from '@/library/utils';
import { multerUpload } from "@/library/multer.ts";
import multerToBody from "@/middleware/multer.to.body.ts";

const router = Router();

router
  .route(routeWdVersion("booking/post-checkout"))
  .post(multerUpload.array('images'), multerToBody, createPostCheckout)
  .get(getAllPostCheckouts);

router
  .route(routeWdVersion("booking/post-checkout/:id"))
  .get(getSinglePostCheckout)
  .patch(
    updatePostCheckout,
  )
  .delete(
    deletePostCheckout,
  );

export default router;
