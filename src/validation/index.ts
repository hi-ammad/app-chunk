import Joi from "joi";
import * as schema from "./joi_schema.ts";

// SCHEMA:UPDATE_ME - JOI
let updateUserJoi = Joi.object<IUser>(schema.updateUserSchema);

/** SCHEMA:SIGN_UP - JOI */
const signUpJoi = Joi.object<IUser & { password_confirm: string }>(
  schema.signUpSchema,
);

/** SCHEMA:LOGIN - JOI */
const loginJoi = Joi.object(schema.loginSchema);

/** SCHEMA:RESET_PASSWORD - JOI  */
const resetPasswordJoi = Joi.object(schema.resetPasswordSchema);

/** SCHEMA:RESET_PASSWORD - JOI  */
const changePasswordJoi = Joi.object(schema.changePasswordSchema)

// SCHEMA:CREATE_BUSINESS_UPLOAD - JOI
let createBusinessUploadJoi = Joi.object<IBusinessUpload>(schema.createBusinessUploadSchema);

// SCHEMA:UPDATE_BUSINESS_UPLOAD - JOI
let updateBusinessUploadJoi = Joi.object<IBusinessUpload>(schema.updateBusinessUploadSchema);

// SCHEMA:CREATE_BUSINESS - JOI
let createBusinessJoi = Joi.object<IBusiness>(schema.createBusinessSchema);

// SCHEMA:UPDATE_BUSINESS - JOI
let updateBusinessJoi = Joi.object<IBusiness>(schema.updateBusinessSchema);

// SCHEMA:CREATE_STAY - JOI
let createStayJoi = Joi.object<IStay>(schema.createStaySchema);

// SCHEMA:CREATE_STAY_SCHEMA - JOI
let updateStayJoi = Joi.object<IStay>(schema.updateStaySchema);

// SCHEMA:CREATE_BUSINESS_PAYMENT - JOI
let createBusinessPaymentJoi = Joi.object<IBusinessPayment>(schema.createBusinessPaymentSchema);

// SCHEMA:CREATE_STAY_SCHEMA - JOI
let updateBusinessPaymentJoi = Joi.object<IBusinessPayment>(schema.updateBusinessPaymentSchema);

// SCHEMA:CREATE_BUSINESS_TYPE - JOI
let createBusinessTypeJoi = Joi.object<IBusinessType>(schema.createBusinessTypeSchema);

// SCHEMA:UPDATE_BUSINESS_TYPE - JOI
let updateBusinessTypeJoi = Joi.object<IBusinessType>(schema.updateBusinessTypeSchema);

// SCHEMA:CREATE_CANCELLATION_POLICY - JOI
let createCancellationPolicyJoi = Joi.object<ICancellationPolicy>(schema.createCancellationPolicySchema);

// SCHEMA:CREATE_CANCELLATION_POLICY - JOI
let updateCancellationPolicyJoi = Joi.object<ICancellationPolicy>(schema.updateCancellationPolicySchema);

// SCHEMA:CREATE_COUNTRY - JOI
let createCountryJoi = Joi.object<ICountry>(schema.createCountrySchema);

// SCHEMA:UPDATE_STAY - JOI
let updateCountryJoi = Joi.object<ICountry>(schema.updateCountrySchema);

// SCHEMA:CREATE_GALLERY_MEDIA - JOI
let createGalleryMediaJoi = Joi.object<IGalleryMedia>(schema.createGalleryMediaSchema);

// SCHEMA:UPDATE_GALLERY_MEDIA - JOI
let updateGalleryMediaJoi = Joi.object<IGalleryMedia>(schema.updateGalleryMediaSchema);

// SCHEMA:CREATE_REVIEW - JOI
let createReviewJoi = Joi.object<IReview>(schema.createReviewSchema);

// SCHEMA:UPDATE_REVIEW - JOI
let updateReviewJoi = Joi.object<IReview>(schema.updateReviewSchema);

// SCHEMA:CREATE_SQUAWK - JOI
let createSquawkJoi = Joi.object<ISquawk>(schema.createSquawkSchema);

// SCHEMA:UPDATE_STAY - JOI
let updateSquawkJoi = Joi.object<ISquawk>(schema.updateSquawkSchema);

// SCHEMA:CREATE_SQUAWK_CATEGORY - JOI
let createSquawkCategoryJoi = Joi.object<ISquawkCategory>(schema.createSquawkCategorySchema);

// SCHEMA:UPDATE_SQUAWK_CATEGORY - JOI
let updateSquawkCategoryJoi = Joi.object<ISquawkCategory>(schema.updateSquawkCategorySchema);

// SCHEMA:CREATE_SQUAWK_COMMENT - JOI
let createSquawkCommentJoi = Joi.object<ISquawkComment>(schema.createSquawkCommentSchema);

// SCHEMA:CREATE_SQUAWK_COMMENT- JOI
let updateSquawkCommentJoi = Joi.object<ISquawkComment>(schema.updateSquawkCommentSchema);

// SCHEMA:CREATE_SQUAWK_TAG - JOI
let createSquawkTagJoi = Joi.object<ISquawkTag>(schema.createSquawkTagSchema);

// SCHEMA:CREATE_SQUAWK_TAG - JOI
let updateSquawkTagJoi = Joi.object<ISquawkTag>(schema.updateSquawkTagSchema);

// SCHEMA:CREATE_STAY_CALENDAR - JOI
let createStayCalendarJoi = Joi.object<IStayCalendar>(schema.createStayCalendarSchema);

// SCHEMA:UPDATE_STAY_CALENDAR - JOI
let updateStayCalendarJoi = Joi.object<IStayCalendar>(schema.updateStayCalendarSchema);

// SCHEMA:CREATE_AIRPORT - JOI
let createAirportJoi = Joi.object<IAirport>(schema.createAirportSchema);

// SCHEMA:UPDATE_AIRPORT - JOI
let updateAirportJoi = Joi.object<IAirport>(schema.updateAirportSchema);

// SCHEMA:CREATE_BOOKING_EXPENSE - JOI
let createBookingExpenseJoi = Joi.object<IBookingExpense>(schema.createBookingExpenseSchema);

// SCHEMA:UPDATE_BOOKING_EXPENSE - JOI
let updateBookingExpenseJoi = Joi.object<IBookingExpense>(schema.updateBookingExpenseSchema);

// SCHEMA:CREATE_BOOKING - JOI
let createBookingJoi = Joi.object<IBooking>(schema.createBookingSchema);

// SCHEMA:Quote_BOOKING - JOI
let quoteBookingJoi = Joi.object<IBooking>(schema.quoteBookingSchema);

// SCHEMA:UPDATE_BOOKING - JOI
let updateBookingJoi = Joi.object<IBooking>(schema.updateBookingSchema);

// SCHEMA:CREATE_POST_CHECKOUT_CHARGES - JOI
let createPostCheckOutJoi = Joi.object<IPostCheckout>(schema.createPostCheckoutChargesSchema);

// SCHEMA:CREATE_POST_CHECKOUT_CHARGES - JOI
let updatePostCheckOutJoi = Joi.object<IPostCheckout>(schema.updatePostCheckoutChargesSchema);

// SCHEMA:CREATE_STAY - JOI
let createBookingTransactionJoi = Joi.object<IBookingTransaction>(schema.createBookingTransactionSchema);

// SCHEMA:UPDATE_STAY - JOI
let updateBookingTransactionJoi = Joi.object<IBookingTransaction>(schema.updateBookingTransactionSchema);

// SCHEMA:CREATE_STAY_EXTRA_SERVICE - JOI
let createStayExtraServiceJoi = Joi.object<IStayExtraService>(schema.createStayExtraServiceSchema);

// SCHEMA:UPDATE_STAY_EXTRA_SERVICE - JOI
let updateExtraServiceJoi = Joi.object<IStayExtraService>(schema.updateStayExtraServiceSchema);

// SCHEMA:CREATE_FAV - JOI
let createFavStayJoi = Joi.object<IUserFavStay>(schema.createFavouriteSchema);

// SCHEMA:CREATE_STAY_FEATURE - JOI
let createStayFeatureJoi = Joi.object<IStayFeature>(schema.createStayFeatureSchema);

// SCHEMA:UPDATE_STAY_FEATURE - JOI
let updateStayFeatureJoi = Joi.object<IStayFeature>(schema.updateStayFeatureSchema);

// SCHEMA:CREATE_STAY_IMAGE - JOI
let createStayImageJoi = Joi.object<IStayImage>(schema.createStayImageSchema);

// SCHEMA:UPDATE_STAY_IMAGE - JOI
let updateStayImageJoi = Joi.object<IStayImage>(schema.updateStayImageSchema);

// SCHEMA:CREATE_STAY_SPACE_TYPE - JOI
let createStaySpaceTypeJoi = Joi.object<IStaySpaceType>(schema.createStaySpaceTypeSchema);

// SCHEMA:UPDATE_STAY_SPACE_TYPE - JOI
let updateStaySpaceTypeJoi = Joi.object<IStaySpaceType>(schema.updateStaySpaceTypeSchema);

// SCHEMA:CREATE_STAY_PLACE_TYPE - JOI
let createStayPlaceTypeJoi = Joi.object<IStayPlaceType>(schema.createStayPlaceTypeSchema);

// SCHEMA:UPDATE_STAY_PLACE_TYPE - JOI
let updateStayPlaceTypeJoi = Joi.object<IStayPlaceType>(schema.updateStayPlaceTypeSchema);

// SCHEMA:CREATE_STAY_SERVICE - JOI
let createStayServiceJoi = Joi.object<IStayServiceType>(schema.createStayServiceSchema);

// SCHEMA:UPDATE_STAY_SERVICE - JOI
let updateStayServiceJoi = Joi.object<IStayServiceType>(schema.updateStayServiceSchema);

// SCHEMA:CREATE_SURFACE_TYPE - JOI
let createStaySurfaceTypeJoi = Joi.object<IStaySurfaceType>(schema.createSurfaceTypeSchema);

// SCHEMA:UPDATE_STAY_SURFACE - JOI
let updateStaySurfaceTypeJoi = Joi.object<IStaySurfaceType>(schema.updateSurfaceTypeSchema);

// SCHEMA:CREATE_TESTIMONIAL - JOI
let createTestimonialJoi = Joi.object<ITestimonial>(schema.createTestimonialSchema);

// SCHEMA:UPDATE_TESTIMONIAL - JOI
let updateTestimonialJoi = Joi.object<ITestimonial>(schema.updateTestimonialSchema);

/** SCHEMA: CREATE MESSAGE - JOI  */
const createMessageJoi = Joi.object(schema.createMessageSchema);

/** SCHEMA: UPDATE MESSAGE - JOI  */
const updateMessageJoi = Joi.object(schema.updateMessageSchema);

/** SCHEMA: CREATE CHAT - JOI  */
const createChatJoi = Joi.object(schema.createChatSchema);

/** SCHEMA: UPDATE CHAT - JOI  */
const updateChatJoi = Joi.object(schema.updateChatSchema);

export {
  loginJoi,
  signUpJoi,
  resetPasswordJoi,
  changePasswordJoi,
  updateUserJoi,
  createBusinessJoi,
  updateBusinessJoi,
  createStayJoi,
  updateStayJoi,
  createBusinessPaymentJoi,
  updateBusinessPaymentJoi,
  createBusinessTypeJoi,
  updateBusinessTypeJoi,
  createBusinessUploadJoi,
  updateBusinessUploadJoi,
  createCancellationPolicyJoi,
  updateCancellationPolicyJoi,
  createCountryJoi,
  updateCountryJoi,
  createGalleryMediaJoi,
  updateGalleryMediaJoi,
  createReviewJoi,
  updateReviewJoi,
  createSquawkJoi,
  updateSquawkJoi,
  createSquawkCategoryJoi,
  updateSquawkCategoryJoi,
  createSquawkCommentJoi,
  updateSquawkCommentJoi,
  createSquawkTagJoi,
  updateSquawkTagJoi,
  createStayCalendarJoi,
  updateStayCalendarJoi,
  createAirportJoi,
  updateAirportJoi,
  createBookingExpenseJoi,
  updateBookingExpenseJoi,
  createBookingJoi,
  updateBookingJoi,
  quoteBookingJoi,
  createPostCheckOutJoi,
  updatePostCheckOutJoi,
  createBookingTransactionJoi,
  updateBookingTransactionJoi,
  createStayExtraServiceJoi,
  updateExtraServiceJoi,
  createFavStayJoi,
  createStayFeatureJoi,
  updateStayFeatureJoi,
  createStayImageJoi,
  updateStayImageJoi,
  createStayPlaceTypeJoi,
  updateStayPlaceTypeJoi,
  createStayServiceJoi,
  updateStayServiceJoi,
  createStaySpaceTypeJoi,
  updateStaySpaceTypeJoi,
  createStaySurfaceTypeJoi,
  updateStaySurfaceTypeJoi,
  createTestimonialJoi,
  updateTestimonialJoi,
  createMessageJoi,
  updateMessageJoi,
  createChatJoi,
  updateChatJoi,
};
