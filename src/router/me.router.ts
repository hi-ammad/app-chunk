import { Router } from "express";
import {
  changePassword,
  deleteMe,
  getMe,
  getMePhoto,
  updateMe,
  updateMePhoto,
  deletePhoto,
} from "@/service/me.service";
import { mediaUpload, routeWdVersion } from "@/library/utils";
import multerIntoReqBody from "@/middleware/multer.to.body";
import multerToBody from "@/middleware/multer.to.body";

const router = Router();

router.route(routeWdVersion("me")).get(getMe).patch(
  mediaUpload.fields([{ name: 'photo', maxCount: 1 }, { name: 'airmen_certificate_front', maxCount: 1 }, { name: 'airmen_certificate_back', maxCount: 1 }, { name: 'driving_license_front', maxCount: 1 }, { name: 'driving_license_back', maxCount: 1 }]),
  multerToBody,
  updateMe).delete(deleteMe);

router
  .route(routeWdVersion("me/photo"))
  .get(getMePhoto)
  .patch(mediaUpload.single('photo'), multerIntoReqBody, updateMePhoto)
  .delete(deletePhoto)

router.route(routeWdVersion("me/change-password")).patch(changePassword);


export default router;

