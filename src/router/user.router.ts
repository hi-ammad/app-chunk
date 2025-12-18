import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "@/service/user.service";
import { mediaUpload, routeWdVersion } from '@/library/utils';
import multerToBody from "@/middleware/multer.to.body";
import { restrictTo } from "@/middleware/auth.middleware";

const router = Router();

router.route(routeWdVersion("users")).get(getAllUsers);
router
  .route(routeWdVersion("user/:id"))
  .get(restrictTo('admin'), getSingleUser)
  .patch(
    restrictTo("admin"),
    //  TODO: restrictTo("admin"),
    mediaUpload.fields([{ name: 'photo', maxCount: 1 }, { name: 'airmen_certificate_front', maxCount: 1 }, { name: 'airmen_certificate_back', maxCount: 1 }, { name: 'driving_license_front', maxCount: 1 }, { name: 'driving_license_back', maxCount: 1 }]),
    multerToBody,
    updateUser,
  )
  .delete(
    restrictTo("admin"),
    deleteUser,
  );



export default router;

