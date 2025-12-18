import { Router } from "express";
import { routeWdVersion } from "@/library/utils";
import {
  checkDisplayName,
  checkEmail,
  forgetPassword,
  genRefreshToken,
  login,
  logout,
  resetPassword,
  sendVerificationOtp,
  signUp,
  verifyForgotOtp,
  verifyUrl,
} from "@/service/auth.service";

import { multerUpload } from "@/library/multer";
import multerIntoReqBody from "@/middleware/multer.to.body";
import { protect } from "@/middleware/auth.middleware";

const router = Router();

router
  .route(routeWdVersion("auth/sign-up"))
  .post(multerUpload.single("photo"), multerIntoReqBody, signUp);

/** API: Verify Url Email */
router.route(routeWdVersion("auth/verify-email/:id/:hexStr")).get(verifyUrl);

/** API: Login */
router.route(routeWdVersion("auth/login")).post(login);

/** Forget Password */
router
  .route(routeWdVersion("auth/forget-password/:email"))
  .post(forgetPassword);

/** Verify Forget Password */
router.route(routeWdVersion("auth/verify-forgot-otp")).post(verifyForgotOtp);

/** Reset Password */
router.route(routeWdVersion("auth/reset-password")).post(resetPassword);

/** Send Verification OTP */
router
  .route(routeWdVersion("auth/send-verification-otp/:email"))
  .post(sendVerificationOtp);

/** Gen-Access-Token */
router.route(routeWdVersion("auth/gen-access-token/")).post(genRefreshToken);

/** Check Email */
router.route(routeWdVersion("auth/check-email/:email")).post(checkEmail);

/** Check UserName */
router.route(routeWdVersion("auth/check-displayname/:display_name")).post(checkDisplayName);

/** API: Logout */
router.route(routeWdVersion("auth/logout")).post(protect, logout);

export default router;
