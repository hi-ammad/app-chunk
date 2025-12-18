import AppError from "@/library/app_error";
import catchAsync from "@/library/catch_async";
import { User } from "@/modal";
import { invalidateUserCache, joiHelper } from "@/library/utils";
import { changePasswordJoi } from "@/validation/";
import APIFeatures from "@/library/api_features";
import { updateUserJoi } from "@/validation";

/* API: GET_ME
 * ********************  START: */
export const getMe = catchAsync(async (req, res, next) => {
  const { populate } = req.query;
  const features = new APIFeatures(
    // User.find({ _id: req.user.id }).cache({ key: req.user.id }),
    User.find({ _id: req.user.id }),
    req.query,
  );
  let query = features.query;
  if (populate) query = query.populate(JSON.parse(populate as string));

  query.cache({
    key: req.user.id,
  }),

    /** Setting Comment - Would Be Name Of Cache Key */
    query.comment(JSON.stringify({ id: req.user.id, populate }));

  const doc = await query;

  if (!doc) {
    return next(new AppError("No user found with", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      fromCached: query.isCached,
      doc: doc[0],
    },
  });
});
/** GET_ME ============================================= END */
/* API: GET_ME PHOTO
 * ******************** START: */
export const getMePhoto = catchAsync(async (req, res, next) => {
  const query = User.findById(req.user.id)
    .select("photo")
    .cache({ key: req.user.id });

  /** Setting Comment - Would Be Name Of Cache Key */
  query.comment(JSON.stringify({ id: req.user.id, select: "photo" }));

  const doc = await query;
  if (!doc) {
    return next(new AppError("No user found with", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      fromCache: query.isCached,
      doc: { photo: doc.photo },
    },
  });
});
/** GET_ME_PHOTO  ============================================= END: */

/* API: UPDATE_ME_PHOTO
 * ********************  START: */
export const updateMePhoto = catchAsync(async (req, res, next) => {
  const doc = await User.findByIdAndUpdate(
    req.user.id,
    {
      photo: req.body.photo,
    },
    {
      new: true,
      runValidators: true,
    },
  ).select("photo");

  if (!doc) {
    return next(new AppError("No user found with", 404));
  }

  /** Invalidate Cache */
  await invalidateUserCache(req.user.id, true);

  res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
});
/** UPDATE_ME_PHOTO ============================================= END */


/* API: UPDATE_ME_PHOTO
 * ********************  START: */
export const deletePhoto = catchAsync(async (req, res, next) => {
  const doc = await User.findById(
    req.user.id,
  )
  if (!doc) {
    return next(new AppError("No user found with", 404));
  }

  doc.photo = undefined;
  await doc.save({});

  /** Invalidate Cache */
  await invalidateUserCache(req.user.id);

  res.status(204).json({});
});
/** UPDATE_ME_PHOTO ============================================= END */

/*  API: UPDATE_ME
 *  ********************  START: */
export const updateMe = catchAsync(async (req, res, next) => {
  /** Check critical field - user cant update critial fields email,password etc  */
  const { error } = joiHelper(updateUserJoi, req.body);
  if (error) return next(new AppError(error.message, 400));

  const doc = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });

  /** Invalidate Cache */
  await invalidateUserCache(req.user.id);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
/** UPDATE_ME  =============================================  END: */

/* API: DELETE_ME
 * ******************** START: */
export const deleteMe = catchAsync(async (req, res, next) => {
  const doc = await User.findByIdAndDelete(req.user.id);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }
  /** Invalidate Cache */
  await invalidateUserCache(req.user.id);
  res.status(204).json({});
});
/** DELETE_ME =============================================  END: */

/* API: CHANGE_PASSWORD
 * ******************** START: */
export const changePassword = catchAsync(async (req, res, next) => {
  /** Validate - Joi */
  const { error } = joiHelper(changePasswordJoi, req.body);

  if (error) return next(new AppError(error.message, 400));

  const { user } = req;

  const pswrdMatched = user.comparePassword(req.body.password_current);
  if (!pswrdMatched)
    return next(new AppError("Current password is wrong", 400));

  const doc = await User.findByIdAndUpdate(
    user.id,
    { password: req.body.password_new },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    status: "success",
    doc,
  });
});
/** CHANGE_PASSWORD  =============================================  END: */
