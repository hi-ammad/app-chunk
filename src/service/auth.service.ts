import Joi from "joi";
import AppError from "@/library/app_error";
import catchAsync from "@/library/catch_async";
import Email from "@/library/email";
import { getToken, joiHelper } from "@/library/utils";
import { User } from "../modal";
import { loginJoi, resetPasswordJoi, signUpJoi } from "@/validation/";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { Constant } from "@/constants";
import otpGenerator from "otp-generator";
import type { Types } from "mongoose";

export const verifyUrl = catchAsync(async (req, res, next) => {
  const { id, hexStr } = req.params
  if (!id || !hexStr) {
    return next(new AppError("Invalid Verification Link", 400));
  }
  const user = await User.findById(id);


  if (!user || user.verification_string !== hexStr) {
    return next(new AppError("User Not Found or Invalid Verification", 404));
  }

  const { accessToken, refreshToken } = getToken({
    id: user._id as Types.ObjectId,
    type: 0,
  });

  user.refreshToken = [refreshToken];
  user.email_verified = true;
  user.email_verified_at = Date.now() + 10 * 60 * 1000;
  user.verification_string = undefined;

  await user.save({ validateBeforeSave: false });

  //  INFO: STORING_COOKIES
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "none" as const,
    secure: true,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  // SENDING_RESPONSE
  res.status(201).json({
    status: "success",
    msg: "user successfully logged in",
    data: {
      user,
      accessToken,
      refreshToken,
    },
  });
});

/*  API: SIGN_UP
 * ****************** START: */
export const signUp = catchAsync(async (req, res, next) => {
  const { body } = req;
  const { error } = signUpJoi.validate(body, { abortEarly: false });

  if (error) return next(new AppError(error.message, 400));

  const user = new User(req.body);

  const randomString = crypto.randomBytes(48).toString("hex");

  const verificationUrl = `${Constant.instance.appUrl}/api/${Constant.instance.server.apiVersion}/auth/verify-email/${user._id}/${randomString}`;

  // SEND_EMAIL
  await new Email(user, verificationUrl, "").sendWelcome();
  await new Email(user, verificationUrl, "").sendAdminWelcome();

  user.verification_string = randomString;
  await user.save({ validateBeforeSave: true });

  // SENDING_RESPONSE
  res.status(201).json({
    status: "success",
    msg: "user successfully signed up, please check your email to verify your account",
  });
});
/** SIGN_UP =================== END: */

/*  API: LOGIN
 * ****************** START: */
export const login = catchAsync(async (req, res, next) => {
  const { body } = req;

  /** JOI_VALIDATION */
  const { error } = joiHelper(loginJoi, body);
  if (error) return next(new AppError(error.message, 400));

  /*  INFO: FINDS_USER_BY_EMAIL_OR_DISPLAY_NAME */
  const user = await User.findOne().or([
    { $or: [{ email: body.email_or_displayname }] },
    { $or: [{ display_name: body.email_or_displayname }] },
  ]);

  if (!user)
    return next(
      new AppError("please provide valid (email or display_name) & password ", 400),
    );

  if (user.status === 2)
    return next(
      new AppError(
        "You Are Blocked By Admin - Contact Admin For More Detail",
        400,
      ),
    );

  /*  INFO: COMPARES_THE_PROVIDED_PASSWORD_WITH_THE_HASHED_PASSWORD_STORED_IN_THE_USER_OBJECT. */
  if (!bcryptjs.compareSync(body.password, user.password))
    return next(
      new AppError("please provide valid (email or display_name) & password ", 400),
    );

  /*  INFO: GETTING_ACCESS_AND_REFRESH_TOKENS_FOR_A_USER.*/
  const { accessToken, refreshToken } = getToken({
    id: user._id as Types.ObjectId,
    type: 0,
  });

  //  INFO: ADD: REFRESH_TOKEN_TO_DB
  user.refreshToken.push(refreshToken);
  await user.save({ validateBeforeSave: false });

  // STORING_COOKIES
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "none" as const,
    secure: true,
    path: "/",
    expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hour
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
    expires: new Date(Date.now() + 8 * 600000), // cookie will be removed after 8 hour
  });

  // HEADERS
  res.header("Authorization", `Bearer ${accessToken}`);

  // SENDING_RESPONSE
  res.status(200).json({
    status: "success",
    msg: "user successfully logged in",
    data: {
      user,
      accessToken,
      refreshToken,
    },
  });
});

/** LOGIN =================== END: */

/* API: FORGET_PASSWORD
 * ****************** START: */
export const forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.params;

  /* VALIDATE_EMAIL */
  const { error } = Joi.string().email().validate(email);
  if (error) return next(new AppError(`${email} is not valid email`, 400));

  //  INFO: 1) GET USER BASED ON POSTED EMAIL
  const user = await User.findOne({ email: req.params.email });
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  /*  INFO: 2) GENERATING OTP - RESET_TOKEN & STORING IT TO USER DOCUMENT */
  const otp = await user.createPasswordReset();

  await user.save({ validateBeforeSave: false });

  /*  INFO: 3) SENDING EMAIL - NODE_MAILER WHEN IN DEV MODE & SENDGRID ON PRODUCTION MODE */
  await new Email(user, "", otp).sendPasswordReset();

  // SENDING RESPONSE
  res.status(200).json({
    status: "success",
    data: {
      msg: `OTP Has Been Sent To Your Email - ${email} `,
    },
  });
});
/* FORGET_PASSWORD ===================  END: */

/*  API: VERIFY_FORGET_PASSWORD
 * ******************  START: */
export const verifyForgotOtp = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;
  if (!email || !otp) next(new AppError("email or otp is Missing", 400));

  const user = await User.findOne({
    email: req.body.email,
    // password_reset_expires: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new AppError(`User Not Found Against ${email} or Otp is Expired`, 400),
    );
  }

  //  INFO: 1) GET - USER_BASED_ON_THE_TOKEN
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  if (hashedOtp !== user.password_reset_otp) {
    return next(new AppError("OTP is Wrong", 400));
  }

  /*  INFO: GENERATE_TOKEN */
  const { resetSecret, _ } =
    Constant.instance.jwt;

  const resetToken = jwt.sign({ id: user.id }, resetSecret!, {
    expiresIn: '5m',
  });

  //  INFO: 2) UPDATE_USER_WITH_RESET_TOKEN
  user.password_reset_otp = undefined
  user.password_reset_expires = undefined
  user.reset_password_token = resetToken

  await user.save({ validateBeforeSave: false });

  /* SENDING_RESPONSE */
  return res.status(200).json({
    status: "success",
    data: {
      msg: "OTP Verified Successfully",
      reset_token: resetToken,
    },
  });
});

/* VERIFY_FORGET_PASSWORD ===================  END: */

/*  API: RESET_PASSWORD
 * ******************  START: */
export const resetPassword = catchAsync(async (req, res, next) => {
  // 1) GETTING TOKEN AND CHECK OF IT'S THERE
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError(
        "Hey You Forgot To Send Bearer Token ! Token Is Missing .",
        401,
      ),
    );
  }

  /* VALIDATE */
  const { error } = resetPasswordJoi.validate(req.body, { abortEarly: false });
  if (error) return next(new AppError(error.message, 400));

  /* VERIFY_TOKEN  */
  const decoded = jwt.verify(
    token,
    Constant.instance.jwt.resetSecret,
  ) as JwtPayload;

  /* FIND_USER */
  const user = await User.findOne({ _id: decoded.id, reset_password_token: token });

  if (!user) return next(new AppError("No User Found", 400));

  /* CHANGE_PASSWORD */
  user.password = req.body.password;
  user.password_changedAt = Date.now();
  user.reset_password_token = undefined;
  user.otp_verify_expires = undefined;
  user.verify_otp = undefined;

  const newUser = await user.save();

  /* GENERATE TOKEN */
  const { accessToken, refreshToken } = getToken({
    id: newUser.id,
    type: 0,
  });

  // SET COOKIES
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
  });

  return res.status(200).json({
    status: "success",
    data: {
      msg: "Password Changed Successfully",
      accessToken,
      refreshToken,
      user: newUser,
    },
  });
});
/* RESET_PASSWORD ===================  END: */

/*  API: SEND_VERIFCATION_OTP
 * ******************  START: */
export const sendVerificationOtp = catchAsync(async (req, res, next) => {
  const { email } = req.params;

  /*  INFO: VALIDATE */
  const { error } = Joi.string().email().validate(email);
  if (error) return next(new AppError(error.message, 400));

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  const verifyOtp = crypto.createHash("sha256").update(otp).digest("hex");

  // OTP
  const otpVerifyExpires = Date.now() + 10 * 60 * 1000;

  //  INFO: UPDATING OTP - DB
  const newUser = (await User.findOneAndUpdate(
    { email },
    {
      verify_otp: verifyOtp,
      otp_verify_expires: otpVerifyExpires,
      password_reset_otp: verifyOtp,
      password_reset_expires: otpVerifyExpires,
    },
  )) as IUser;

  if (!newUser) return next(new AppError("Did Not Find User", 400));

  await new Email(newUser, "", otp).sendVerification();

  return res.status(200).json({
    status: "success",
    data: {
      msg: `OTP Has Been Sent To Your Email - ${email} `,
    },
  });
});
/* SEND VERIFCATION_OTP =================== END: */

/*  API: GENERATE_REFRESH_TOKEN
 * ******************  START: */
export const genRefreshToken = catchAsync(async (req, res, next) => {
  // 1) GETTING_TOKEN_HEADERS AND CHECK OF IT'S THERE
  let foundRefreshToken: string | undefined;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    foundRefreshToken = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.jwt) {
    foundRefreshToken = req.cookies.jwt;
  }

  if (!foundRefreshToken) {
    return next(new AppError("Token Is Missing...", 401));
  }

  /* 2) EXTRACT JWT SECRETS */
  const { refreshSecret, } =
    Constant.instance.jwt;

  /* 3) DECODE JWT */
  const decoded = jwt.verify(foundRefreshToken, refreshSecret) as JwtPayload;

  /* 4) CHECK IF USER STILL EXISTS **/
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does not longer exist.",
        401,
      ),
    );
  }

  /* 5) CHECK TOKEN AVAILABLE IN DB **/
  if (!currentUser.refreshToken.includes(foundRefreshToken)) {
    currentUser.refreshToken = [];
    await currentUser.save();
    return next(
      new AppError(
        "You Sent An Invalid Token, Please Login Again To Authenticate or Refresh Token",
        401,
      ),
    );
  }

  const { accessToken, refreshToken } = getToken({
    id: currentUser._id,
    type: 0,
  });

  const filterToken = currentUser.refreshToken.filter(
    (token: string) => token != foundRefreshToken,
  );

  // 6) SAVING: NEW REFRESH TOKEN TO DB
  currentUser.refreshToken = [refreshToken, ...filterToken];
  await currentUser.save();

  // STORING - COOKIES
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
  });

  res.status(201).json({
    status: "success",
    data: {
      accessToken,
      refreshToken,
      user: currentUser,
    },
  });
});
/* GENERATE_REFRESH_TOKEN ===================  END: */

/*  API: CHECK_USER_NAME_AVAILABLE
 * ******************  START: */
export const checkDisplayName = catchAsync(async (req, res, next) => {
  const { display_name } = req.params;
  const foundUser = await User.exists({ display_name });

  if (foundUser != null)
    return next(
      new AppError(
        `${display_name} already exist, if you forgot your password you can reset it`,
        400,
      ),
    );
  return res
    .status(200)
    .json({ status: "success", data: { msg: "you can use this display_name" } });
});
/* CHECK USER_NAME AVAILABLE ===================  END: */

/*  API: CHECK_EMAIL_AVAILABLE
 * ******************  START: */
export const checkEmail = catchAsync(async (req, res, next) => {
  const { email } = req.params;
  const user = await User.findOne({ email });
  if (user != null)
    return next(
      new AppError(
        `${email} already exist, if you forgot your password you can reset it`,
        400,
      ),
    );

  return res.status(200).json({
    status: "success",
    data: { msg: "you can use this email" },
  });
});
/* CHECK EMAIL AVAILABLE ================  END: */

/*  API: LOGOUT
 * ******************  START: */
export const logout = catchAsync(async (req, res, next) => {
  //  NOTE: Remove Cookies 
  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')

  const refreshToken = req.headers.authorization?.split(" ")[1]

  if (!req.user.refreshToken.includes(refreshToken)) return next(new AppError("Wrong RefreshToken", 401));


  const tokens = req.user.refreshToken.filter((e: string) => e !== refreshToken)
  await User.findByIdAndUpdate(req.user.id, { refreshToken: tokens })

  return res.status(200).json({
    status: "success",
    data: { msg: "Logout Successfully" },
  });
});
/* CHECK_EMAIL_AVAILABLE ================  END: */
