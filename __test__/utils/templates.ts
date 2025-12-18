import { faker } from '@faker-js/faker';

// 👤 Sign-up Template with Faker
export const signUpTemplate = {
  _id: faker.database.mongodbObjectId(),
  email: faker.internet.email(),
  password: faker.internet.password({ length: 12, memorable: true }),
  password_confirm: '', // will match password later
  display_name: faker.internet.username(),
  phone: faker.phone.number(),
};

//  NOTE: Login Template (derived in builder instead)

// Business Template with Faker
export const businessCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  name: faker.company.name(),
  user: signUpTemplate._id, // Assuming the user is the one who created the business
  address: {
    country: faker.location.country(),
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: +faker.location.zipCode({ format: '#####' }),
    area: faker.location.street(),
    address: faker.location.streetAddress(),
    apartment: faker.location.secondaryAddress(),
    location: {
      type: 'Point',
      coordinates: [
        faker.location.longitude(),
        faker.location.latitude(),
      ],
    },
  },
  business_type: [
    faker.database.mongodbObjectId(),
    faker.database.mongodbObjectId(),
  ],
  description: faker.lorem.sentence(),
  tagline: faker.company.catchPhrase(),
  phone: faker.phone.number(),
  airport: faker.location.city(),
  distance_from_runway: faker.number.int({ min: 1, max: 50 }),
  url: faker.internet.url(),
  operation_hours: {
    monday: { open: '04:00', close: '04:00' },
    tuesday: { open: '04:00', close: '04:00' },
    wednesday: { open: '04:00', close: '04:00' },
    thursday: { open: '04:00', close: '04:00' },
    friday: { open: '04:00', close: '04:00' },
    saturday: { open: '04:00', close: '04:00' },
  },
};

export const businessUpdateTemplate = {
  name: faker.company.name(),
  address: {
    city: faker.location.city(),
    address: faker.location.streetAddress(),
  },
  description: faker.lorem.sentence(),
  tagline: faker.company.catchPhrase(),
  phone: faker.phone.number(),
  url: faker.internet.url(),
};

export const businessPaymentCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  business: faker.database.mongodbObjectId(),
  stripe_customer_id: faker.string.numeric(15),
  stripe_subscription_id: faker.string.numeric(10),
  stripe_payment_method: 'card',
  status: 'unpaid',
};

export const businessPaymentUpdateTemplate = {
  status: 'paid',
};


export const businessTypeCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  name: faker.commerce.department(),
  user: signUpTemplate._id, // Assuming the user is the one who created the business type
};

export const businessTypeUpdateTemplate = {
  name: faker.commerce.department(),
};

export const cancellationPolicyCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  name: faker.commerce.department(),
  type: 0, // Assuming 0 is a valid type for cancellation policy
  before_check_in: "Guests receive a full refund if they cancel 24 hours or more",
  after_check_in: 'If the Guest cancels after the check-in time, the Host will be paid for each night the Guest does stay, plus 1 full additional night.',
};

export const cancellationPolicyUpdateTemplate = {
  name: faker.commerce.department(),
};

export const countryCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  name: faker.location.country(),
  code: faker.location.countryCode(),
};

export const countryUpdateTemplate = {
  name: faker.location.country(),
  code: faker.location.countryCode(),
};

export const galleryMediaCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  description: faker.lorem.sentence(),
  sort_order: faker.number.int({ min: 1, max: 100 }),
  image: faker.image.urlLoremFlickr({ category: 'business', width: 640, height: 480 }),
};

export const galleryMediaUpdateTemplate = {
  description: faker.lorem.sentence(),
  sort_order: faker.number.int({ min: 1, max: 100 }),
};

export const reviewCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  stay: faker.database.mongodbObjectId(),
  guest: signUpTemplate._id, // Assuming the user is the one who created the review
  rating: faker.number.int({ min: 1, max: 5 }),
  comment: faker.lorem.sentence(),
  type: 0, // 0: guest-to-stay, 1: guest-to-business, 2: host-to-guest, 3: guest-to-host
};

export const reviewUpdateTemplate = {
  rating: faker.number.int({ min: 1, max: 5 }),
  comment: faker.lorem.sentence(),
};

export const squawkCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  html: `<h1>${faker.lorem.sentence()}</h1>`,
  tags: [faker.lorem.word(), faker.lorem.word()],
  user: signUpTemplate._id, // Assuming the user is the one who created the squawk
}

export const squawkUpdateTemplate = {
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  html: `<h1>${faker.lorem.sentence()}</h1>`,
  tags: [faker.lorem.word(), faker.lorem.word()],
};

export const squawkCategoryCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  name: faker.lorem.word(),
}

export const squawkCategoryUpdateTemplate = {
  name: faker.lorem.word(),
};

export const squawkCommentCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  squawk: squawkCreateTemplate._id,
  comment: faker.lorem.sentence(),
}

export const squawkCommentUpdateTemplate = {
  comment: faker.lorem.sentence(),
};

export const squawkTagsCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  name: faker.lorem.word(),
}

export const squawkTagsUpdateTemplate = {
  name: faker.lorem.word(),
};

export const airportCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  stay: faker.database.mongodbObjectId(),
  airport_identifier: faker.string.alpha({ length: 3 }),
  airport_name: faker.company.name(),
  airport_use: faker.number.int({ min: 0, max: 1 }), // 0: public, 1: private, 2: military
  ctaf_unicom: faker.lorem.word(),
  dimension_feets: faker.number.int({ min: 1, max: 100 }),
  dimension_meters: faker.number.int({ min: 1, max: 100 }),
  elevation_feets: faker.number.int({ min: 1, max: 100 }),
  elevation_meters: faker.number.int({ min: 1, max: 100 }),
  fuel: faker.lorem.word(),
  lighting: faker.datatype.boolean(),
};

export const airportUpdateTemplate = {
  airport_identifier: faker.string.alpha({ length: 3 }),
  airport_name: faker.company.name(),
  airport_use: faker.number.int({ min: 0, max: 1 }), // 0: public, 1: private, 2: military
  ctaf_unicom: faker.lorem.word(),
  dimension_feets: faker.number.int({ min: 1, max: 100 }),
  dimension_meters: faker.number.int({ min: 1, max: 100 }),
  elevation_feets: faker.number.int({ min: 1, max: 100 }),
  elevation_meters: faker.number.int({ min: 1, max: 100 }),
  fuel: faker.lorem.word(),
  lighting: faker.datatype.boolean(),
};

export const bookingCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  user: signUpTemplate._id, // Assuming the user is the one who created the booking
  stay: faker.database.mongodbObjectId(),
  arrival_date: faker.date.past().toISOString(),
  departure_date: faker.date.future().toISOString(),
  no_of_guests: faker.number.int({ min: 1, max: 10 }),
  amount: faker.number.int({ min: 1, max: 1000 }),
  taxes: faker.number.int({ min: 1, max: 100 }),
};

export const bookingUpdateTemplate = {
  arrival_date: faker.date.past().toISOString(),
  departure_date: faker.date.future().toISOString(),
  no_of_guests: faker.number.int({ min: 1, max: 10 }),
  amount: faker.number.int({ min: 1, max: 1000 }),
  taxes: faker.number.int({ min: 1, max: 100 }),
};

export const bookingExpenseCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  stay: faker.database.mongodbObjectId(),
  guests: faker.number.int({ min: 1, max: 10 }),
  bed: faker.number.int({ min: 1, max: 10 }),
  bed_type: faker.number.int({ min: 0, max: 3 }), // 0: single, 1: double, 2: queen, 3: king
  name: faker.commerce.productName(),
};

export const bookingExpenseUpdateTemplate = {
  guests: faker.number.int({ min: 1, max: 10 }),
  bed: faker.number.int({ min: 1, max: 10 }),
  bed_type: faker.number.int({ min: 0, max: 3 }), // 0: single, 1: double, 2: queen, 3: king
  name: faker.commerce.productName(),
};

export const postCheckoutChargeCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  reason: faker.lorem.sentence(),
  amount: faker.number.int({ min: 1, max: 1000 }),
  situation_description: faker.lorem.paragraph(),
  booking: faker.database.mongodbObjectId(),
  user: signUpTemplate._id, // Assuming the user is the one who created the post checkout charge
  status: faker.number.int({ min: 0, max: 2 }), // 0 - pending, 1 - approved, 2 - rejected
  images: Array.from({ length: 3 }, () => faker.image.url()),
};

export const postCheckoutChargeUpdateTemplate = {
  reason: faker.lorem.sentence(),
  amount: faker.number.int({ min: 1, max: 1000 }),
  situation_description: faker.lorem.paragraph(),
  status: faker.number.int({ min: 0, max: 2 }), // 0 - pending, 1 - approved, 2 - rejected
};

export const transactionCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  user: signUpTemplate._id, // Assuming the user is the one who created the transaction
  payment_method_id: faker.string.uuid(),
  payment_intent_id: faker.string.uuid(),
  payment_method_type: 'bank_transfer', // Example payment method type
  transaction_reference: faker.string.uuid(),
  amount: faker.number.int({ min: 1, max: 1000 }),
  taxes: faker.number.int({ min: 1, max: 100 }),
  type: faker.number.int({ min: 0, max: 1 }), // 0: CREDIT, 1: DEBIT
  status: faker.number.int({ min: 0, max: 2 }), // 0: PENDING, 1: SUCCESS, 2: DECLINED
  purpose: faker.number.int({ min: 0, max: 1 }), // 0: BOOKING, 1: REFUND
  meta_data: faker.lorem.sentence(),
};

export const transactionUpdateTemplate = {
  payment_method_id: faker.string.uuid(),
  payment_intent_id: faker.string.uuid(),
  payment_method_type: 'card', // Assuming card is a valid payment method type
  transaction_reference: faker.string.uuid(),
  amount: faker.number.int({ min: 1, max: 1000 }),
  taxes: faker.number.int({ min: 1, max: 100 }),
  type: faker.number.int({ min: 0, max: 1 }), // 0: CREDIT, 1: DEBIT
  status: faker.number.int({ min: 0, max: 2 }), // 0: PENDING, 1: SUCCESS, 2: DECLINED
  purpose: faker.number.int({ min: 0, max: 1 }), // 0: BOOKING, 1: REFUND
  meta_data: faker.lorem.sentence(),
};

export const stayCalendarCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  block_dates: Array.from({ length: 5 }, () => ({
    start_date: faker.date.past().toISOString(),
    end_date: faker.date.future().toISOString(),
  })),
  provider: faker.company.name(),
  type: faker.number.int({ min: 0, max: 1 }), // 0 for blocked, 1 for available
  stay: faker.database.mongodbObjectId(),
  user: signUpTemplate._id, // Assuming the user is the one who created the blocked dates
};

export const stayCalendarUpdateTemplate = {
  block_dates: Array.from({ length: 5 }, () => ({
    start_date: faker.date.past().toISOString(),
    end_date: faker.date.future().toISOString(),
  })),
  provider: faker.company.name(),
  type: faker.number.int({ min: 0, max: 1 }), // 0 for blocked, 1 for available
};

export const stayGalleryMediaCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  description: faker.lorem.sentence(),
  image: faker.image.urlLoremFlickr({ category: 'business', width: 640, height: 480 }),
  sort_order: faker.number.int({ min: 1, max: 100 }),
  stay: faker.database.mongodbObjectId(),
  user: signUpTemplate._id, // Assuming the user is the one who created the stay gallery media
};
export const stayGalleryMediaUpdateTemplate = {
  description: faker.lorem.sentence(),
  image: faker.image.urlLoremFlickr({ category: 'business', width: 640, height: 480 }),
  sort_order: faker.number.int({ min: 1, max: 100 }),
};

export const stayExtraServiceCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  price: faker.number.int({ min: 1, max: 1000 }),
  quantity: faker.number.int({ min: 1, max: 10 }),
  name: faker.commerce.productName(),
  service_type: faker.database.mongodbObjectId(),
  stay: faker.database.mongodbObjectId(),
};

export const stayExtraServiceUpdateTemplate = {
  price: faker.number.int({ min: 1, max: 1000 }),
  quantity: faker.number.int({ min: 1, max: 10 }),
  name: faker.commerce.productName(),
};

export const favStayCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  stay: faker.database.mongodbObjectId(),
};

export const favStayUpdateTemplate = {
  stay: faker.database.mongodbObjectId(),
};

export const stayFeatureCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  name: faker.commerce.productName(),
  parent: faker.database.mongodbObjectId(),
};

export const stayFeatureUpdateTemplate = {
  name: faker.commerce.productName(),
};

export const stayImageCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  description: faker.lorem.sentence(),
  image: faker.image.urlLoremFlickr({ category: 'business', width: 640, height: 480 }),
  sort_order: faker.number.int({ min: 1, max: 100 }),
  stay: faker.database.mongodbObjectId(),
};

export const stayImageUpdateTemplate = {
  description: faker.lorem.sentence(),
  image: faker.image.urlLoremFlickr({ category: 'business', width: 640, height: 480 }),
  sort_order: faker.number.int({ min: 1, max: 100 }),
};

export const stayPlaceTypeCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  name: faker.commerce.productName(),
  user: signUpTemplate._id, // Assuming the user is the one who created the stay place type
};

export const stayPlaceTypeUpdateTemplate = {
  name: faker.commerce.productName(),
};

export const stayServiceCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  name: faker.commerce.productName(),
};

export const stayServiceUpdateTemplate = {
  name: faker.commerce.productName(),
};

export const staySpaceTypeCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  name: faker.commerce.productName(),
  is_active: faker.datatype.boolean(),
};

export const staySpaceTypeUpdateTemplate = {
  name: faker.commerce.productName(),
  is_active: faker.datatype.boolean(),
};

export const staySurfaceTypeCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  name: faker.commerce.productName(),
  is_active: faker.datatype.boolean(),
};

export const staySurfaceTypeUpdateTemplate = {
  name: faker.commerce.productName(),
  is_active: faker.datatype.boolean(),
};

export const testimonialCreateTemplate = {
  _id: faker.database.mongodbObjectId(),
  name: faker.person.fullName(),
  photo: faker.image.avatar(),
  occupation: faker.person.jobTitle(),
  testimonial: faker.lorem.sentence(),
  is_active: faker.datatype.boolean(),
};

export const testimonialUpdateTemplate = {
  name: faker.person.fullName(),
  photo: faker.image.avatar(),
  occupation: faker.person.jobTitle(),
  testimonial: faker.lorem.sentence(),
  is_active: faker.datatype.boolean(),
};
