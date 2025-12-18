import { Testimonial, StayFeature, StayImage, StaySpaceType, StaySurfaceType, Favourite, StayExtraService, PostCheckout, Airport, Booking, BookingExpense, BookingTransaction, Squawk, SquawkCategory, SquawkTag, SquawkComment, Review, GalleryMedia, Business, BusinessType, BusinessPayment, CancellationPolicy, Country, StayCalendar, StayService, StayPlaceType } from "@/modal";
import { app, buildLoginPayload, buildSignUpPayload, Route, signUpTemplate } from "../utils/";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import { Constant } from "@/constants";
import RedisCache from "@/library/redis";
import { enhanceQueryWithCache } from "@/cache";

var accessToken: string = "";

export function getAccessToken() {
  return accessToken;
}

const setUpDummyBusiness = async () => {
  await Business.create(
    Array.from({ length: 100 }, () => getDummyBusiness())
  );
}

const setUpDummyBusinessPayment = async () => {
  await BusinessPayment.create(
    Array.from({ length: 100 }, () => getDummyBusinessPayment())
  );
}

const getDummyBusinessPayment = () => ({
  _id: faker.database.mongodbObjectId(),
  business: faker.database.mongodbObjectId(),
  stripe_customer_id: faker.string.uuid(),
  stripe_payment_method: 'card',
  stripe_subscription_id: faker.string.uuid(),
  status: 'unpaid',
});

const setUpDummyBusinessType = async () => {
  await BusinessType.create(
    Array.from({ length: 100 }, () => getDummyBusinessType())
  );
}

const getDummyBusinessType = () => ({
  _id: faker.database.mongodbObjectId(),
  name: faker.commerce.department(),
  user: faker.database.mongodbObjectId(),
});

const setUpDummyCancellationPolicy = async () => {
  await CancellationPolicy.create(
    Array.from({ length: 100 }, () => getDummyCancellationPolicy())
  );
}

const getDummyCancellationPolicy = () => ({
  _id: faker.database.mongodbObjectId(),
  name: faker.commerce.department(),
  user: faker.database.mongodbObjectId(),
  type: faker.number.int({ min: 0, max: 1 }), // 0 for flexible, 1 for moderate, 2 for strict
  before_check_in: "Guests receive a full refund if they cancel 24 hours or more before the scheduled check-in time. The Host doesn’t get paid for the booking.",
  after_check_in: 'If the Guest cancels after the check-in time, the Host will be paid for each night the Guest does stay, plus 1 full additional night.',
});


const setUpDummyCountries = async () => {
  const uniqueCountries = faker.helpers.uniqueArray(faker.location.country, 30);
  const uniqueCountryCodes = faker.helpers.uniqueArray(faker.location.countryCode, 100);
  await Country.create(
    Array.from({ length: 30 }, (_, index: number) => ({
      ...getDummyCountry(),
      name: uniqueCountries[index],
      code: uniqueCountryCodes[index]
    }))
  );
}
const getDummyCountry = () => ({
  _id: faker.database.mongodbObjectId(),
  is_active: faker.datatype.boolean(),
  user: signUpTemplate._id, // Assuming the user is the one who created the country
});


const getDummyBusiness = () => ({
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
  }
});

const setUpDummyGalleryMedia = async () => {
  await GalleryMedia.create(Array.from({ length: 30 }, () => (
    {
      _id: faker.database.mongodbObjectId(),
      description: faker.lorem.sentence(),
      image: faker.image.url(),
      sort_order: faker.number.int({ min: 1, max: 100 }),
      user: signUpTemplate._id, // Assuming the user is the one who created the media
    })));
}

const setUpDummyReviews = async () => {
  await Review.create(Array.from({ length: 30 }, () => (
    {
      _id: faker.database.mongodbObjectId(),
      guest: signUpTemplate._id, // Assuming the user is the one who created the review
      stay: faker.database.mongodbObjectId(),
      type: 0,
      rating: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.sentence(),
    })));
}

const setUpDummySquawk = async () => {
  return await Squawk.create(Array.from({ length: 30 }, () => ({
    _id: faker.database.mongodbObjectId(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    html: `<h1>${faker.lorem.sentence()}</h1>`,
    tags: [faker.lorem.word(), faker.lorem.word()],
    user: signUpTemplate._id, // Assuming the user is the one who created the squawk
  })));
}

const setUpDummySquawkCategories = async () => {
  return await SquawkCategory.create(Array.from({ length: 30 }, () => ({
    _id: faker.database.mongodbObjectId(),
    name: faker.lorem.word(),
    user: signUpTemplate._id, // Assuming the user is the one who created the category
  })));
}

const setUpDummySquawkComments = async () => {
  return await SquawkComment.create(Array.from({ length: 30 }, () => ({
    _id: faker.database.mongodbObjectId(),
    squawk: signUpTemplate._id,
    user: signUpTemplate._id, // Assuming the user is the one who created the comment
    comment: faker.lorem.sentence(),
  })));
}

const setUpDummySquawkTags = async () => {
  return await SquawkTag.create(Array.from({ length: 30 }, () => ({
    _id: faker.database.mongodbObjectId(),
    name: faker.lorem.word(),
    user: signUpTemplate._id, // Assuming the user is the one who created the tag
  })));
}

const setUpDummyAirport = async () => {
  return Airport.create(Array.from({ length: 30 }, () => ({
    _id: faker.database.mongodbObjectId(),
    airport_identifier: faker.string.alpha({ length: 3 }),
    airport_name: faker.company.name(),
    airport_use: faker.number.int({ min: 0, max: 2 }), //  // 0: public, 1: private, 2: military
    ctaf_unicom: faker.lorem.word(),
    dimension_feets: faker.number.int({ min: 1, max: 100 }),
    dimension_meters: faker.number.int({ min: 1, max: 100 }),
    elevation_feets: faker.number.int({ min: 1, max: 100 }),
    elevation_meters: faker.number.int({ min: 1, max: 100 }),
    fuel: faker.lorem.word(),
    lighting: faker.datatype.boolean(),
    stay: signUpTemplate._id, // Assuming the user is the one who created the airport
  })));
}

const setUpDummyBooking = async () => {
  return Booking.create(Array.from({ length: 30 }, () => ({
    _id: faker.database.mongodbObjectId(),
    user: signUpTemplate._id, // Assuming the user is the one who created the booking
    stay: faker.database.mongodbObjectId(),
    arrival_date: faker.date.past().toISOString(),
    departure_date: faker.date.future().toISOString(),
    no_of_guests: faker.number.int({ min: 1, max: 10 }),
    amount: faker.number.int({ min: 1, max: 1000 }),
    taxes: faker.number.int({ min: 1, max: 100 }),
  })));
}

const setUpBookingExpenses = async () => {
  return BookingExpense.create(Array.from({ length: 30 }, () => ({
    _id: faker.database.mongodbObjectId(),
    user: signUpTemplate._id, // Assuming the user is the one who created the expense
    stay: faker.database.mongodbObjectId(),
    guests: faker.number.int({ min: 1, max: 10 }),
    bed: faker.number.int({ min: 1, max: 10 }),
    bed_type: faker.number.int({ min: 0, max: 2 }), // 0: single, 1: double, 2: queen, 3: king
    name: faker.commerce.productName(),
  })));
}

export const setUpDummyPostCheckoutCharges = async () => {
  return PostCheckout.create(Array.from({ length: 30 }, () => ({
    _id: faker.database.mongodbObjectId(),
    reason: faker.lorem.sentence(),
    amount: faker.number.int({ min: 1, max: 1000 }),
    situation_description: faker.lorem.paragraph(),
    booking: faker.database.mongodbObjectId(),
    user: signUpTemplate._id, // Assuming the user is the one who created the post checkout charge
    status: faker.number.int({ min: 0, max: 2 }), // 0 - pending, 1 - approved, 2 - rejected
    images: Array.from({ length: 3 }, () => faker.image.url()),
  })));
}

export const setUpDummyTransactions = async () => {
  return BookingTransaction.create(Array.from({ length: 30 }, () => ({
    _id: faker.database.mongodbObjectId(),
    user: signUpTemplate._id, // Assuming the user is the one who created the transaction
    payment_method_id: faker.string.uuid(),
    payment_intent_id: faker.string.uuid(),
    payment_method_type: 'card',
    transaction_reference: faker.string.uuid(),
    amount: faker.number.int({ min: 1, max: 1000 }),
    taxes: faker.number.int({ min: 1, max: 100 }),
    type: faker.number.int({ min: 0, max: 1 }), // 0: CREDIT, 1: DEBIT
    status: faker.number.int({ min: 0, max: 2 }), // 0: PENDING, 1: SUCCESS, 2: DECLINED
    purpose: faker.number.int({ min: 0, max: 1 }), // 0: BOOKING, 1: REFUND
    meta_data: faker.lorem.sentence(),
  })));
}

const setUpDummyBlockedDates = async () => {
  return StayCalendar.create(Array.from({ length: 30 }, () => ({
    _id: faker.database.mongodbObjectId(),
    block_dates: Array.from({ length: 5 }, () => ({
      start_date: faker.date.past().toISOString(),
      end_date: faker.date.future().toISOString(),
    })),
    provider: faker.company.name(),
    type: faker.number.int({ min: 0, max: 1 }), // 0 for blocked, 1 for available
    stay: faker.database.mongodbObjectId(),
    user: signUpTemplate._id, // Assuming the user is the one who created the blocked dates
  })));
}

const setUpDummyStayExtraServices = async () => {
  return StayExtraService.create(Array.from({ length: 30 }, () => ({
    _id: faker.database.mongodbObjectId(),
    price: faker.number.int({ min: 1, max: 1000 }),
    quantity: faker.number.int({ min: 1, max: 10 }),
    name: faker.commerce.productName(),
    service_type: faker.database.mongodbObjectId(),
    stay: faker.database.mongodbObjectId(),
    user: signUpTemplate._id, // Assuming the user is the one who created the stay service
  })));
}

const setUpDummyStayServices = async () => {
  return StayService.create(Array.from({ length: 30 }, () => ({
    _id: faker.database.mongodbObjectId(),
    name: faker.commerce.department(),
    parent: faker.database.mongodbObjectId(),
    user: signUpTemplate._id, // Assuming the user is the one who created the stay service category
  })));
}

const setUpDummyStayPlaceType = async () => {
  return StayPlaceType.create(Array.from({ length: 30 }, () => ({
    _id: faker.database.mongodbObjectId(),
    name: faker.commerce.department(),
    parent: faker.database.mongodbObjectId(),
    user: signUpTemplate._id, // Assuming the user is the one who created the stay place type
  })));
}

const setUpDummyStayExtraService = async () => {
  return StayExtraService.create(Array.from({ length: 30 }, () => ({
    _id: faker.database.mongodbObjectId(),
    price: faker.number.int({ min: 1, max: 1000 }),
    quantity: faker.number.int({ min: 1, max: 10 }),
    name: faker.commerce.productName(),
    service_type: faker.database.mongodbObjectId(),
    stay: faker.database.mongodbObjectId(),
    user: faker.database.mongodbObjectId(),
  })));
}

const setUpDummyStayFav = async () => {
  return Favourite.create(Array.from({ length: 30 }, () => ({
    _id: faker.database.mongodbObjectId(),
    user: signUpTemplate._id, // Assuming the user is the one who created the stay favorite
    stay: faker.database.mongodbObjectId(),
  })));
}

const setUpDummyStayFeature = async () => {
  return StayFeature.create(Array.from({ length: 30 }, () => ({
    _id: faker.database.mongodbObjectId(),
    name: faker.commerce.department(),
    parent: faker.database.mongodbObjectId(),
    user: signUpTemplate._id, // Assuming the user is the one who created the stay feature
  })));
}

const setUpDummyStayImage = async () => {
  return StayImage.create(Array.from({ length: 30 }, () => ({
    _id: faker.database.mongodbObjectId(),
    description: faker.lorem.sentence(),
    image: faker.image.urlLoremFlickr({ category: 'business', width: 640, height: 480 }),
    sort_order: faker.number.int({ min: 1, max: 100 }),
    stay: faker.database.mongodbObjectId(),
    user: signUpTemplate._id, // Assuming the user is the one who created the stay image
  })));
}


const setUpDummyStayService = async () => {
  return StayService.create(Array.from({ length: 30 }, () => ({
    _id: faker.database.mongodbObjectId(),
    name: faker.commerce.department(),
    user: signUpTemplate._id, // Assuming the user is the one who created the stay service category
  })));
}

const setUpDummyStaySpace = async () => {
  return StaySpaceType.create(Array.from({ length: 30 }, () => ({
    _id: faker.database.mongodbObjectId(),
    name: faker.commerce.department(),
    user: signUpTemplate._id, // Assuming the user is the one who created the stay service category
  })));
}

const setUpDummyStaySurface = async () => {
  return StaySurfaceType.create(Array.from({ length: 30 }, () => ({
    _id: faker.database.mongodbObjectId(),
    name: faker.commerce.department(),
    user: signUpTemplate._id, // Assuming the user is the one who created the stay service category
  })));
}

const setUpDummyTestimonial = async () => {
  return Testimonial.create(Array.from({ length: 30 }, () => ({
    _id: faker.database.mongodbObjectId(),
    name: faker.person.fullName(),
    photo: faker.image.avatar(),
    occupation: faker.person.jobTitle(),
    testimonial: faker.lorem.sentence(),
    is_active: faker.datatype.boolean(),
    user: signUpTemplate._id, // Assuming the user is the one who created the testimonial
  })));
}
async function setupTestUser() {
  // Check if the user already exists by trying to log in
  // if we ran auth test than the user should already exist
  // so we can skip the sign up
  let res = await app.post(Route.login).send(buildLoginPayload());

  // If we did not ran auth test than the user does not exist,
  // so we need to sign up, then try to log in again and get the access token.
  if (res.status !== 200) {
    await app.post(Route.signUp).send(buildSignUpPayload());
    res = await app.post(Route.login).send(buildLoginPayload());
  }
  accessToken = res.body.data.accessToken;
}

const emptyDatabase = async () => {
  const collections = await mongoose.connection.db?.listCollections().toArray();
  // Loop through and drop each collection
  for (let collection of collections || []) {
    await mongoose.connection.db?.dropCollection(collection.name);
  }
}

// This function is called before all tests to set up the database and cache
async function setup() {
  console.log('🔧 Global Setup Running...');
  await mongoose.connect(Constant.instance.db.url)
  await RedisCache.instance.client.connect();
  await enhanceQueryWithCache();
  console.log('✅ Database and cache setup completed.');
  await emptyDatabase();
  console.log('✅ Database cleared.');
  await setupTestUser();
  console.log('✅ Test user setup completed.');
  await setUpDummyCancellationPolicy();
  console.log('✅ Dummy cancellation policies setup completed.');
  await setUpDummyCountries();
  console.log('✅ Dummy countries setup completed.');
  await setUpDummyBusinessType();
  console.log('✅ Dummy business types setup completed.');
  await setUpDummyBusiness();
  console.log('✅ Dummy businesses setup completed.');
  await setUpDummyBusinessPayment();
  console.log('✅ Dummy business payments setup completed.');
  await setUpDummyGalleryMedia();
  console.log('✅ Dummy gallery media setup completed.');
  await setUpDummyReviews();
  console.log('✅ Dummy reviews setup completed.');
  await setUpDummySquawk();
  console.log('✅ Dummy squawks setup completed.');
  await setUpDummySquawkCategories();
  console.log('✅ Dummy squawk categories setup completed.');
  await setUpDummySquawkComments();
  console.log('✅ Dummy squawk comments setup completed.');
  await setUpDummySquawkTags();
  console.log('✅ Dummy squawk tags setup completed.');
  await setUpDummyAirport();
  console.log('✅ Dummy airports setup completed.');
  await setUpDummyBooking();
  console.log('✅ Dummy bookings setup completed.');
  await setUpBookingExpenses();
  console.log('✅ Dummy booking expenses setup completed.');
  await setUpDummyPostCheckoutCharges();
  console.log('✅ Dummy post checkout charges setup completed.');
  await setUpDummyTransactions();
  console.log('✅ Dummy transactions setup completed.');
  await setUpDummyBlockedDates();
  console.log('✅ Dummy blocked dates setup completed.');
  await setUpDummyStayExtraServices();
  console.log('✅ Dummy stay extra services setup completed.');
  await setUpDummyStayPlaceType();
  console.log('✅ Dummy stay place types setup completed.');
  await setUpDummyStayFav();
  console.log('✅ Dummy stay favorites setup completed.');
  await setUpDummyStayFeature();
  console.log('✅ Dummy stay features setup completed.');
  await setUpDummyStayImage();
  console.log('✅ Dummy stay images setup completed.');
  await setUpDummyStayService();
  console.log('✅ Dummy stay services setup completed.');
  await setUpDummyStaySpace();
  console.log('✅ Dummy stay spaces setup completed.');
  await setUpDummyStaySurface();
  console.log('✅ Dummy stay surfaces setup completed.');
  await setUpDummyTestimonial();
  console.log('✅ Dummy testimonials setup completed.');
  console.log('🔧 Global Setup Completed.');
}

await setup();
