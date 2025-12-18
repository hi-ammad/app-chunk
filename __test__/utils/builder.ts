// builders.ts
import * as templates from './templates.ts';

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// Build dynamic sign-up payload
export function buildSignUpPayload(overrides = {}) {
  const base = deepClone(templates.signUpTemplate);
  base.password_confirm = base.password;

  return {
    ...base,
    ...overrides,
  };
}

// Build login body
export function buildLoginPayload({ email_or_displayname = templates.signUpTemplate.email, password = templates.signUpTemplate.password } = {}) {
  return { email_or_displayname, password };
}

// Build create business payload
export function buildCreateBusinessPayload(overrides = {}) {
  return {
    ...deepClone(templates.businessCreateTemplate),
    ...overrides,
  };
}

// Build business payload
export function buildUpdateBusinessPayload(overrides = {}) {
  return {
    ...deepClone(templates.businessUpdateTemplate),
    ...overrides,
  };
}

// Build create business-payment payload
export function buildCreateBusinessPaymentPayload(overrides = {}) {
  return {
    ...deepClone(templates.businessPaymentCreateTemplate),
    ...overrides,
  };
}

// Build business payload
export function buildUpdateBusinessPaymentPayload(overrides = {}) {
  return {
    ...deepClone(templates.businessPaymentUpdateTemplate),
    ...overrides,
  };
}

// Build create business-payment payload
export function buildCreateBusinessTypePayload(overrides = {}) {
  return {
    ...deepClone(templates.businessTypeCreateTemplate),
    ...overrides,
  };
}

// Build business payload
export function buildUpdateBusinessTypePayload(overrides = {}) {
  return {
    ...deepClone(templates.businessTypeUpdateTemplate),
    ...overrides,
  };
}

// Build create business-payment payload
export function buildCreateCancellationPolicyPayload(overrides = {}) {
  return {
    ...deepClone(templates.cancellationPolicyCreateTemplate),
    ...overrides,
  };
}

// Build business payload
export function buildUpdateCancellationPolicyPayload(overrides = {}) {
  return {
    ...deepClone(templates.cancellationPolicyUpdateTemplate),
    ...overrides,
  };
}

// Build create business-payment payload
export function buildCreateCountryPayload(overrides = {}) {
  return {
    ...deepClone(templates.countryCreateTemplate),
    ...overrides,
  };
}

// Build business payload
export function buildUpdateCountryPayload(overrides = {}) {
  return {
    ...deepClone(templates.countryUpdateTemplate),
    ...overrides,
  };
}

// Build create business-payment payload
export function buildCreateGalleryMediaPayload(overrides = {}) {
  return {
    ...deepClone(templates.galleryMediaCreateTemplate),
    ...overrides,
  };
}

// Build business payload
export function buildUpdateGalleryMediaPayload(overrides = {}) {
  return {
    ...deepClone(templates.galleryMediaUpdateTemplate),
    ...overrides,
  };
}

// Build create business-payment payload
export function buildCreateReviewPayload(overrides = {}) {
  return {
    ...deepClone(templates.reviewCreateTemplate),
    ...overrides,
  };
}

// Build business payload
export function buildUpdateReviewPayload(overrides = {}) {
  return {
    ...deepClone(templates.reviewUpdateTemplate),
    ...overrides,
  };
}

// Build create business-payment payload
export function buildCreateSquawkPayload(overrides = {}) {
  return {
    ...deepClone(templates.squawkCreateTemplate),
    ...overrides,
  };
}

// Build business payload
export function buildUpdateSquawkPayload(overrides = {}) {
  return {
    ...deepClone(templates.squawkUpdateTemplate),
    ...overrides,
  };
}


// Build create business-payment payload
export function buildCreateSquawkCategoryPayload(overrides = {}) {
  return {
    ...deepClone(templates.squawkCategoryCreateTemplate),
    ...overrides,
  };
}

// Build business payload
export function buildUpdateSquawkCategoryPayload(overrides = {}) {
  return {
    ...deepClone(templates.squawkCategoryUpdateTemplate),
    ...overrides,
  };
}
// Build create business-payment payload
export function buildCreateSquawkCommentPayload(overrides = {}) {
  return {
    ...deepClone(templates.squawkCommentCreateTemplate),
    ...overrides,
  };
}

// Build business payload
export function buildUpdateSquawkCommentPayload(overrides = {}) {
  return {
    ...deepClone(templates.squawkCommentUpdateTemplate),
    ...overrides,
  };
}
// Build create business-payment payload
export function buildCreateSquawkTagPayload(overrides = {}) {
  return {
    ...deepClone(templates.squawkTagsCreateTemplate),
    ...overrides,
  };
}

// Build business payload
export function buildUpdateSquawkTagPayload(overrides = {}) {
  return {
    ...deepClone(templates.squawkTagsUpdateTemplate),
    ...overrides,
  };
}

// Build create stay calendar payload
export function buildCreateStayCalendarPayload(overrides = {}) {
  return {
    ...deepClone(templates.stayCalendarCreateTemplate),
    ...overrides,
  };
}

// Build update stay calendar payload
export function buildUpdateStayCalendarPayload(overrides = {}) {
  return {
    ...deepClone(templates.stayCalendarUpdateTemplate),
    ...overrides,
  };
}

// Build create stay gallery media payload
export function buildCreateStayGalleryMediaPayload(overrides = {}) {
  return {
    ...deepClone(templates.stayGalleryMediaCreateTemplate),
    ...overrides,
  };
}

// Build update stay gallery media payload
export function buildUpdateStayGalleryMediaPayload(overrides = {}) {
  return {
    ...deepClone(templates.stayGalleryMediaUpdateTemplate),
    ...overrides,
  };
}

// Build create booking payload
export function buildCreateBookingPayload(overrides = {}) {
  return {
    ...deepClone(templates.bookingCreateTemplate),
    ...overrides,
  };
}

// Build update booking payload
export function buildUpdateBookingPayload(overrides = {}) {
  return {
    ...deepClone(templates.bookingUpdateTemplate),
    ...overrides,
  };
}

// Build create booking expense payload
export function buildCreateBookingExpensePayload(overrides = {}) {
  return {
    ...deepClone(templates.bookingExpenseCreateTemplate),
    ...overrides,
  };
}
// Build update booking expense payload
export function buildUpdateBookingExpensePayload(overrides = {}) {
  return {
    ...deepClone(templates.bookingExpenseUpdateTemplate),
    ...overrides,
  };
}

// Build create post checkout charge payload
export function buildCreatePostCheckoutChargePayload(overrides = {}) {
  return {
    ...deepClone(templates.postCheckoutChargeCreateTemplate),
    ...overrides,
  };
}
// Build update post checkout charge payload
export function buildUpdatePostCheckoutChargePayload(overrides = {}) {
  return {
    ...deepClone(templates.postCheckoutChargeUpdateTemplate),
    ...overrides,
  };
}
// Build create airport payload
export function buildCreateAirportPayload(overrides = {}) {
  return {
    ...deepClone(templates.airportCreateTemplate),
    ...overrides,
  };
}
// Build update airport payload
export function buildUpdateAirportPayload(overrides = {}) {
  return {
    ...deepClone(templates.airportUpdateTemplate),
    ...overrides,
  };
}
// Build create transaction payload
export function buildCreateTransactionPayload(overrides = {}) {
  return {
    ...deepClone(templates.transactionCreateTemplate),
    ...overrides,
  };
}
// Build update transaction payload
export function buildUpdateTransactionPayload(overrides = {}) {
  return {
    ...deepClone(templates.transactionUpdateTemplate),
    ...overrides,
  };
}

// build stay extra service payload
export function buildCreateStayExtraServicePayload(overrides = {}) {
  return {
    ...deepClone(templates.stayExtraServiceCreateTemplate),
    ...overrides,
  };
}
// build update stay extra service payload
export function buildUpdateStayExtraServicePayload(overrides = {}) {
  return {
    ...deepClone(templates.stayExtraServiceUpdateTemplate),
    ...overrides,
  };
}

// build fav stay payload
export function buildCreateFavStayPayload(overrides = {}) {
  return {
    ...deepClone(templates.favStayCreateTemplate),
    ...overrides,
  };
}

// build update fav stay payload
export function buildUpdateFavStayPayload(overrides = {}) {
  return {
    ...deepClone(templates.favStayCreateTemplate),
    ...overrides,
  };
}

// build stay feature payload
export function buildCreateStayFeaturePayload(overrides = {}) {
  return {
    ...deepClone(templates.stayFeatureCreateTemplate),
    ...overrides,
  };
}
// build update stay feature payload
export function buildUpdateStayFeaturePayload(overrides = {}) {
  return {
    ...deepClone(templates.stayFeatureUpdateTemplate),
    ...overrides,
  };
}
// build stay image payload
export function buildCreateStayImagePayload(overrides = {}) {
  return {
    ...deepClone(templates.stayImageCreateTemplate),
    ...overrides,
  };
}
// build update stay image payload
export function buildUpdateStayImagePayload(overrides = {}) {
  return {
    ...deepClone(templates.stayImageUpdateTemplate),
    ...overrides,
  };
}

// build stay place type payload
export function buildCreateStayPlaceTypePayload(overrides = {}) {
  return {
    ...deepClone(templates.stayPlaceTypeCreateTemplate),
    ...overrides,
  };
}
// build update stay place type payload
export function buildUpdateStayPlaceTypePayload(overrides = {}) {
  return {
    ...deepClone(templates.stayPlaceTypeUpdateTemplate),
    ...overrides,
  };
}
// build stay service payload
export function buildCreateStayServicePayload(overrides = {}) {
  return {
    ...deepClone(templates.stayServiceCreateTemplate),
    ...overrides,
  };
}
// build update stay service payload
export function buildUpdateStayServicePayload(overrides = {}) {
  return {
    ...deepClone(templates.stayServiceUpdateTemplate),
    ...overrides,
  };
}
// build stay space type payload
export function buildCreateStaySpaceTypePayload(overrides = {}) {
  return {
    ...deepClone(templates.staySpaceTypeCreateTemplate),
    ...overrides,
  };
}
// build update stay space type payload
export function buildUpdateStaySpaceTypePayload(overrides = {}) {
  return {
    ...deepClone(templates.staySpaceTypeUpdateTemplate),
    ...overrides,
  };
}
// build stay surface type payload
export function buildCreateStaySurfaceTypePayload(overrides = {}) {
  return {
    ...deepClone(templates.staySurfaceTypeCreateTemplate),
    ...overrides,
  };
}
// build update stay surface type payload
export function buildUpdateStaySurfaceTypePayload(overrides = {}) {
  return {
    ...deepClone(templates.staySurfaceTypeUpdateTemplate),
    ...overrides,
  };
}
// build testimonial payload
export function buildCreateTestimonialPayload(overrides = {}) {
  return {
    ...deepClone(templates.testimonialCreateTemplate),
    ...overrides,
  };
}
// build update testimonial payload
export function buildUpdateTestimonialPayload(overrides = {}) {
  return {
    ...deepClone(templates.testimonialUpdateTemplate),
    ...overrides,
  };
}
