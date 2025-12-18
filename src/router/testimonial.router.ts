import { Router } from "express";
import {
  createTestimonial,
  deleteTestimonial,
  getAllTestimonials,
  getSingleTestimonial,
  updateTestimonial,
} from "@/service/testimonial.service";
import { routeWdVersion } from '@/library/utils';
import { multerUpload } from "@/library/multer.ts";
import multerToBody from "@/middleware/multer.to.body.ts";

const router = Router();

router
  .route(routeWdVersion("testimonial"))
  .post(multerUpload.single('photo'), multerToBody, createTestimonial)
  .get(getAllTestimonials);

router
  .route(routeWdVersion("testimonial/:id"))
  .get(getSingleTestimonial)
  .patch(
    updateTestimonial,
  )
  .delete(
    deleteTestimonial,
  );

export default router;
