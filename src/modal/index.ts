import { model } from "mongoose";

import { chatSchema, messageSchema, testimonialSchema, staySpaceTypeSchema, stayServiceTypeSchema, stayPlaceTypeSchema, favouriteSchema, stayFeatureSchema, bookingTransactionSchema, postCheckoutSchema, bookingSchema, bookingExpenseSchema, squawkTagSchema, squawkCommentSchema, squawkCategorySchema, squawkSchema, reviewSchema, galleryMediaSchema, countrySchema, businessSchema, userSchema, staySchema, businessPaymentSchema, businessTypeSchema, businessUploadSchema, cancellationPolicySchema, stayCalendarSchema, stayAirportSchema, stayExtraServiceSchema, stayImageSchema, staySurfaceTypeSchema, airportSchema } from "@/schema/";

import { EModalNames } from "@/enum";

export const Business = model(EModalNames.BUSINESS, businessSchema);
export const BusinessPayment = model(EModalNames.BUSINESS_PAYMENT, businessPaymentSchema);
export const User = model(EModalNames.USER, userSchema);
export const Stay = model(EModalNames.STAY, staySchema);
export const BusinessType = model(EModalNames.BUSINESS_TYPE, businessTypeSchema);
export const BusinessUpload = model(EModalNames.BUSINESS_UPLOAD, businessUploadSchema);
export const CancellationPolicy = model(EModalNames.CANCELLATION_POLICY, cancellationPolicySchema);
export const Country = model(EModalNames.COUNTRY, countrySchema);
export const GalleryMedia = model(EModalNames.GALLERY_MEDIA, galleryMediaSchema);
export const Review = model(EModalNames.REVIEW, reviewSchema);
export const Squawk = model(EModalNames.SQUAWK, squawkSchema);
export const SquawkCategory = model(EModalNames.SQUAWK_CATEGORY, squawkCategorySchema);
export const Airport = model(EModalNames.AIRPORT, airportSchema);
export const SquawkComment = model(EModalNames.SQUAWK_COMMENT, squawkCommentSchema);
export const SquawkTag = model(EModalNames.SQUAWK_TAG, squawkTagSchema);
export const StayCalendar = model(EModalNames.STAY_CALENDAR, stayCalendarSchema);
export const StayAirport = model(EModalNames.STAY_AIRPORT, stayAirportSchema);
export const BookingExpense = model(EModalNames.BOOKING_EXPENSE, bookingExpenseSchema);
export const Booking = model(EModalNames.BOOKING, bookingSchema);
export const PostCheckout = model(EModalNames.POST_CHECKOUT, postCheckoutSchema);
export const BookingTransaction = model(EModalNames.BOOKING_TRANSACTION, bookingTransactionSchema);
export const StayExtraService = model(EModalNames.STAY_EXTRA_SERVICE, stayExtraServiceSchema);
export const Favourite = model(EModalNames.FAVOURITE, favouriteSchema);
export const StayFeature = model(EModalNames.STAY_FEATURE, stayFeatureSchema);
export const StayImage = model(EModalNames.STAY_IMAGE, stayImageSchema);
export const StayPlaceType = model(EModalNames.STAY_PLACE_TYPE, stayPlaceTypeSchema);
export const StayService = model(EModalNames.STAY_SERVICE, stayServiceTypeSchema);
export const StaySpaceType = model(EModalNames.STAY_SPACE_TYPE, staySpaceTypeSchema);
export const StaySurfaceType = model(EModalNames.STAY_SURFACE_TYPE, staySurfaceTypeSchema);
export const Testimonial = model(EModalNames.TESTIMONIAL, testimonialSchema);
export const Chat = model(EModalNames.CHAT, chatSchema);
export const Message = model(EModalNames.MESSAGE, messageSchema, "messages");
