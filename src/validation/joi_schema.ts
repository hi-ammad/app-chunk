import Joi from "joi";

/** SCHEMA:LOGIN */
const loginSchema = {
  email_or_displayname: Joi.string().required(),
  password: Joi.string().required(),
}

/** SCHEMA:SIGN_UP */
const signUpSchema = {
  _id: Joi.string().hex().length(24).optional(),
  display_name: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(3).optional(),
  password: Joi.string().min(8).required(),
  password_confirm: Joi.string().required().custom((value, helpers) => {
    if (value !== helpers.state.ancestors[0].password) {
      return helpers.message({ custom: '\"password_confirm\" does not match to \"password\".' });
    }
    return value;
  }),
}

/** SCHEMA:RESET_PASSWORD */
const resetPasswordSchema = {
  password: Joi.string()
    .min(8)
    .required(),
  password_confirm: Joi.string().required().valid(Joi.ref("password")),
}

/** SCHEMA:CHANGE_PASSWORD */
const changePasswordSchema = {
  password_current: Joi.string().required(),
  password_new: Joi.string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  password_confirm: Joi.string().required().valid(Joi.ref("password_new")),
}
// id: Types.ObjectId;
// chat: Types.ObjectId;
// sender: Types.ObjectId;
// message: string;
// status: 'sent' | 'delivered' | 'read';

const createMessageSchema = {
  chat: Joi.string().hex().length(24).required(),
  message: Joi.string().required(),
  sender: Joi.string().hex().length(24).required(),
  status: Joi.string().valid('sent', 'delivered', 'read').required(),
}

const updateMessageSchema = {
  message: Joi.string().optional(),
  status: Joi.string().valid('sent', 'delivered', 'read').optional(),
}

const createChatSchema = {
  participent_1: Joi.string().hex().length(24).required(),
  participent_2: Joi.string().hex().length(24).required(),
  admin: Joi.string().hex().length(24).required(),
  booking: Joi.string().hex().length(24).required(),
  status: Joi.string().valid('active', 'archived').required(),
}

const updateChatSchema = {
  participent_1: Joi.string().hex().length(24).optional(),
  participent_2: Joi.string().hex().length(24).optional(),
  admin: Joi.string().hex().length(24).optional(),
  booking: Joi.string().hex().length(24).optional(),
  status: Joi.string().valid('active', 'archived').optional(),
}

/** SCHEMA:UPDATE_USER */
const updateUserSchema = {
  first_name: Joi.string().min(3).optional(),
  last_name: Joi.string().min(3).optional(),
  display_name: Joi.string().min(3).optional(),
  middle_name: Joi.string().min(3).optional(),
  native_language: Joi.string().optional(),
  other_language: Joi.array().items(Joi.string()).optional(),
  phone: Joi.string().pattern(
    /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/
  ).message('Invalid US phone number format'),
  other_phone: Joi.string().pattern(
    /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/
  ).message('Invalid US phone number format'),
  additional_email: Joi.string().email().optional(),
  airmen_certificate_front: Joi.string().uri().optional(),
  airmen_certificate_back: Joi.string().uri().optional(),
  driving_license_front: Joi.string().uri().optional(),
  driving_license_back: Joi.string().uri().optional(),
  driving_license_verified: Joi.boolean().optional(),
  airmen_verified: Joi.boolean().optional(),
  bio: Joi.string().optional(),
  mailing_address: Joi.object({
    address: Joi.string().optional(),
    apartment: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    zip_code: Joi.string().optional(),
    neighbourhood: Joi.string().optional(),
    area: Joi.string().optional(),
    country: Joi.string().optional(),
  }).optional(),
  contact: Joi.object({
    name: Joi.string().optional(),
    phone: Joi.string().pattern(
      /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/
    ).message('Invalid US phone number format'),
    email: Joi.string().required().optional(),
    relationship: Joi.string().optional(),
  }).optional(),
  social_links: Joi.object({
    facebook_url: Joi.string()
      .uri()
      .pattern(/facebook\.com/),
    twitter_url: Joi.string()
      .uri()
      .pattern(/x\.com/),
    linkedin_url: Joi.string()
      .uri()
      .pattern(/linkedin\.com/),
    instagram_url: Joi.string()
      .uri()
      .pattern(/instagram\.com/),
    pinterest_url: Joi.string()
      .uri()
      .pattern(/pinterest\.com/),
    youtube_url: Joi.string()
      .uri()
      .pattern(/youtube\.com/),
    vimeo_url: Joi.string()
      .uri()
      .pattern(/vimeo\.com/),
    airbnb_url: Joi.string()
      .uri()
      .pattern(/airbnb\.com/),
    top_advisor_url: Joi.string()
      .uri()
  }).optional(),
  photo: Joi.string()
    .uri().optional(),
  provider: Joi.string().valid('google', 'facebook', 'apple', 'local').optional(),
};

/** SCHEMA:CREATE_BUSINESS_TYPE */
const createBusinessTypeSchema = {
  _id: Joi.string().hex().length(24).optional(),
  name: Joi.string().min(3).max(50).required(),
  user: Joi.string().hex().length(24).optional(),
  is_active: Joi.boolean().default(true).optional(),
}

/** SCHEMA:UPDATE_BUSINESS_TYPE */
const updateBusinessTypeSchema = {
  name: Joi.string().min(3).max(50).optional(),
  is_active: Joi.boolean().optional(),
}

/** SCHEMA:CREATE_BUSINESS */
const createBusinessSchema = {
  _id: Joi.string().hex().length(24).optional(),
  user: Joi.string().hex().length(24).required(),
  name: Joi.string().min(3).required(),
  address: Joi.object({
    area: Joi.string().optional(),
    address: Joi.string().required(),
    apartment: Joi.string().optional(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    zipcode: Joi.string().required(),
    location: Joi.object({
      type: Joi.string().valid("Point").required(),
      coordinates: Joi.array().items(Joi.number()).length(2).required(), // [longitude, latitude]
    }).required(),
  }).required(),
  images: Joi.array().items(Joi.object({
    description: Joi.string().optional(),
    image: Joi.string().required(),
    sort_order: Joi.number().required(),
  })).optional(),
  logo: Joi.string().uri().optional(),
  business_type: Joi.array().items(Joi.string().hex().length(24)).required(),
  description: Joi.string().min(3).required(),
  tagline: Joi.string().min(3).required(),
  phone: Joi.string().min(3).required(),
  airport: Joi.string().optional(),
  distance_from_runway: Joi.number().optional(),
  operation_hours: Joi.object({
    monday: Joi.object(
      {
        open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required(),
        close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required()
      }
    ).optional(),

    tuesday: Joi.object(
      {
        open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required(),
        close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required()
      }
    ).optional(),

    wednesday: Joi.object(
      {
        open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required(),
        close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required()
      }
    ).optional(),
    thursday: Joi.object(
      {
        open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required(),
        close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required()
      }
    ).optional(),
    friday: Joi.object(
      {
        open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required(),
        close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required()
      }
    ).optional(),
    saturday: Joi.object(
      {
        open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required(),
        close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required()
      }
    ).optional(),
  }).required(), // Assuming operation_hours is an object, you can define its structure as needed
  is_active: Joi.boolean().default(true).optional(),
  url: Joi.string().uri().optional(),
  isPaid: Joi.boolean().default(false).optional()
}

/** SCHEMA:UPDATE_BUSINESS  */
const updateBusinessSchema = {
  _id: Joi.string().hex().length(24).optional(),
  name: Joi.string().min(3).optional(),
  address: Joi.object({
    area: Joi.string().optional(),
    address: Joi.string().optional(),
    apartment: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().optional(),
    zipcode: Joi.string().optional(),
    location: Joi.object({
      type: Joi.string().valid("Point").required(),
      coordinates: Joi.array().items(Joi.number()).length(2).required(), // [longitude, latitude]
    }).optional(),
  }).optional(),
  images: Joi.array().items(Joi.object({
    description: Joi.string().optional(),
    image: Joi.string().optional(),
    sort_order: Joi.number().optional(),
  })).optional(),
  logo: Joi.string().uri().optional(),
  business_type: Joi.array().items(Joi.string().hex().length(24)).optional(),
  description: Joi.string().min(3).optional(),
  tagline: Joi.string().min(3).optional(),
  phone: Joi.string().min(3).optional(),
  airport: Joi.string().optional(),
  distance_from_runway: Joi.number().optional(),
  operation_hours: Joi.object({
    monday: Joi.object(
      {
        open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional(),
        close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional()
      }
    ).optional(),

    tuesday: Joi.object(
      {
        open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional(),
        close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional()
      }
    ).optional(),
    wednesday: Joi.object(
      {
        open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional(),
        close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional()
      }
    ).optional(),
    thursday: Joi.object(
      {
        open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional(),
        close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional()
      }
    ).optional(),
    friday: Joi.object(
      {
        open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional(),
        close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional()
      }
    ).optional(),
    saturday: Joi.object(
      {
        open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional(),
        close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional()
      }
    ).optional(),
  }).optional(), // Assuming operation_hours is an object, you can define its structure as needed
  is_active: Joi.boolean().default(true).optional(),
  url: Joi.string().uri().optional(),
}

/** SCHEMA:CREATE_STAY */
const createStaySchema = {
  _id: Joi.string().hex().length(24).optional(),
  user: Joi.string().hex().length(24).required(),
  rental_type: Joi.string().required(), // e.g., "Apartment", "House", etc.
  address: Joi.object({
    area: Joi.string().optional(),
    address: Joi.string().required(),
    apartment: Joi.string().optional(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    zipcode: Joi.string().required(),
    location: Joi.object({
      type: Joi.string().valid("Point").optional(),
      coordinates: Joi.array().items(Joi.number()).length(2).required(), // [longitude, latitude]
    }).required(),
    fake_location: Joi.object({
      type: Joi.string().valid("Point").required(),
      coordinates: Joi.array().items(Joi.number()).length(2).required(), // [longitude, latitude]
    }).optional(),
  }).required(),
  images: Joi.array().items(Joi.object({
    description: Joi.string().optional(),
    image: Joi.string().optional(),
    sort_order: Joi.number().optional(),
  }
  )),
  space_type: Joi.string().required(),
  stay_type: Joi.string().required(),
  stay_title: Joi.string().required(),
  is_draft: Joi.string().optional(),
  no_of_guest: Joi.number().integer().min(1).required(),
  no_of_bedrooms: Joi.number().integer().min(1).required(),
  no_of_beds: Joi.number().integer().min(1).required(),
  no_of_bathrooms: Joi.number().min(1).required(),
  no_of_rooms: Joi.number().integer().min(1).required(),
  size: Joi.number().integer().min(1).required(),
  unit_of_measure: Joi.string().valid('sqm', 'sqft', 'acre').optional(), // sqm,sqft,acre etc.
  description: Joi.string().min(10).required(),
  bedrooms: Joi.array().items(Joi.object({
    name: Joi.string().optional(),
    no_of_guest: Joi.number().integer().min(1).optional(),
    no_of_beds: Joi.number().integer().min(1).optional(),
    bed_type: Joi.number().optional(), // e.g., 0 for Single, 1 for Double, etc.
  })).optional(),

  airports: Joi.array().items(Joi.object({
    identifier: Joi.string().required(),
    name: Joi.string().required(),
    use: Joi.number().valid(0, 1, 2).required(), // 0: Public Use, 1: Private Use, 2: Private - Permission Required
    ctaf_unicom: Joi.string().required(),

    operation_hours: Joi.object({
      monday: Joi.object(
        {
          open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required(),
          close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required()
        }
      ).optional(),
      tuesday: Joi.object(
        {
          open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required(),
          close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required()
        }
      ).optional(),
      wednesday: Joi.object(
        {
          open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required(),
          close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required()
        }
      ).optional(),
      thursday: Joi.object(
        {
          open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required(),
          close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required()
        }
      ).optional(),
      friday: Joi.object(
        {
          open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required(),
          close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required()
        }
      ).optional(),
      saturday: Joi.object(
        {
          open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required(),
          close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).required()
        }
      ).optional(),
    }).required(), // Assuming operation_hours is an object, you can define its structure as needed
    dimension_width: Joi.number().optional(),
    dimension_length: Joi.number().optional(),
    dimension_unit: Joi.number().valid(0, 1).optional(), // 0: Feet, 1: Meters
    elevation_start: Joi.number().integer().optional(),
    elevation_end: Joi.number().integer().optional(),
    fuel: Joi.string().optional(),
    lighting: Joi.boolean().optional(),
    orientation: Joi.string().optional(),
    runway_condition: Joi.string().optional(),
    parking: Joi.string().optional(),
    pattern: Joi.string().optional(),
    helicopter_allowed: Joi.boolean().optional(),
    surface: Joi.string().optional(),
    air_nav: Joi.string()
      .uri({ scheme: ['https'] }) // Ensures it's a valid HTTPS URI
      .pattern(/^https:\/\/airnav\.com\/airport\/[A-Za-z0-9_-]+$/)
      .optional(),
    ground_transportation: Joi.string().optional(),
    distance_from_runway: Joi.number().precision(2).optional(),
    additional_info: Joi.string().optional()
  })).required(),

  pricing: Joi.object({
    nightly_price: Joi.number().precision(2).optional(), // in currency units
    apply_weekend_price: Joi.string()
      .valid("Saturday & Sunday", "Friday & Saturday", "Saturday", "Sunday")
      .default("Saturday & Sunday"),
    weekend_nightly_price: Joi.number().precision(2).optional(), // in currency units
    nightly_price_seven_plus: Joi.number().precision(2).optional(), // in currency units
    nightly_price_thirty_plus: Joi.number().precision(2).optional(), // in currency units
    cleaning_fee: Joi.number().precision(2).optional(), // in currency units
    cleaning_fee_frequency: Joi.string(),
    city_fee: Joi.number().precision(2).optional(), // in currency units
    city_fee_frequency: Joi.string(),


    tax_percentage: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .optional(), // percentage value
  }).required(),

  custom_pricing: Joi.array().items(Joi.object({
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    nightly_price: Joi.number().precision(2).optional(), // in currency units
    weekend_nightly_price: Joi.number().precision(2).optional(), // in currency units
    price_additional_guest: Joi.number().precision(2).optional(), // in currency units
  })).optional(),
  calendar: Joi.array().items(Joi.object({
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    type: Joi.number().valid(0, 1).required(), // 0 for blocked, 1 for available
  })).optional(),
  rules: Joi.object({
    smoking_allowed: Joi.boolean().default(false),
    party_allowed: Joi.boolean().default(false),
    children_allowed: Joi.boolean().default(false),
    children_start_age: Joi.number().integer().min(0).optional(), // age from which children are considered
    children_end_age: Joi.number().integer().min(0).optional(), // age until which children are considered
    infant_start_age: Joi.number().integer().min(0).optional(), // age from which infants are considered
    infant_end_age: Joi.number().integer().min(0).optional(), // age until which infants are considered
    pets_allowed: Joi.boolean().default(false),
    additional_guest_allowed: Joi.boolean().default(false),
    instant_booking: Joi.boolean().optional(),
    cancellation_policy_short: Joi.string()
      .min(3)
      .max(100)
      .optional(), // e.g., policy ID or code
    cancellation_policy_long: Joi.string()
      .min(3)
      .max(500)
      .optional(), // detailed cancellation policy
    min_day_booking: Joi.number().integer().min(1).default(1), // minimum days for booking
    max_day_booking: Joi.number().integer().min(1).optional(), // maximum days for booking
    check_in_after: Joi.string().pattern(/^(0[1-9]|1[0-2]):[0-5][0-9] ((AM|PM)|(am|pm))$/).required(), // e.g., "04:28 AM" || "04:28 pm"
    check_out_before: Joi.string().pattern(/^(0[1-9]|1[0-2]):[0-5][0-9] ((AM|PM)|(am|pm))$/).required(), // e.g., "04:28 AM" || "04:28 pm"
    rules: Joi.string().optional(), // general rules for the stay
  }).required(),
  extra_services: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    service_type: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().precision(2).optional(), // in currency units
    quantity: Joi.number().integer().optional(), // in currency units
    is_active: Joi.boolean().default(true),
  })).optional(),
  features: Joi.array().items(Joi.string()).optional(), // e.g., ["WiFi", "Air Conditioning", etc.]
  welcome_message: Joi.string().required(),
}

/** SCHEMA:UPDATE_STAY */
const updateStaySchema = {
  _id: Joi.string().hex().length(24).optional(),
  rental_type: Joi.string().optional(), // e.g., "Apartment", "House", etc.
  cleaning_fee_frequency: Joi.string().optional(),
  city_fee_frequency: Joi.string().optional(),
  address: Joi.object({
    area: Joi.string().optional(),
    address: Joi.string().optional(),
    apartment: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().optional(),
    zipcode: Joi.string().optional(),
    location: Joi.object({
      type: Joi.string().valid("Point").required(),
      coordinates: Joi.array().items(Joi.number()).length(2).required(), // [longitude, latitude]
    }).optional(),
    fake_location: Joi.object({
      type: Joi.string().valid("Point").required(),
      coordinates: Joi.array().items(Joi.number()).length(2).required(), // [longitude, latitude]
    }).optional(),
  }).optional(),
  images: Joi.array().items(Joi.object({
    description: Joi.string().optional(),
    image: Joi.string().optional(),
    sort_order: Joi.number().optional(),
  })).optional(),
  space_type: Joi.string().optional(),
  stay_type: Joi.string().optional(),
  stay_title: Joi.string().optional(),
  no_of_guest: Joi.number().integer().min(1).optional(),
  no_of_bedrooms: Joi.number().integer().min(1).optional(),
  no_of_beds: Joi.number().integer().min(1).optional(),
  no_of_bathrooms: Joi.number().optional(),
  no_of_rooms: Joi.number().integer().min(1).optional(),
  size: Joi.number().integer().min(1).optional(),
  unit_of_measure: Joi.string().valid('sqm', 'sqft', 'acre').optional(), // sqm,sqft,acre etc.
  description: Joi.string().min(10).optional(),
  bedrooms: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().optional(),
        no_of_guest: Joi.number()
          .integer()
          .min(1)
          .optional(),
        no_of_beds: Joi.number()
          .integer()
          .min(1)
          .optional(),
        bed_type: Joi.number()
          .valid(0, 1, 2, 3) // e.g., 0 for Single, 1 for Double, etc.
          .optional(), // Adjust based on your bed types
      })
    )
    .optional(),

  airports: Joi.array()
    .items(
      Joi.object({
        identifier: Joi.string().optional(),
        name: Joi.string().optional(),
        use: Joi.number().valid(0, 1).optional(), // 0: Public Use, 1: Private Use
        ctaf_unicom: Joi.string().optional(),
        operation_hours: Joi.object({
          monday: Joi.object(
            {
              open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional(), // 24-hour format HH:mm
              close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional() // 24-hour format HH:mm
            }
          ).optional(),
          tuesday: Joi.object(
            {
              open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional(),
              close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional()
            }
          ).optional(),
          wednesday: Joi.object(
            {
              open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional(),
              close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional()
            }
          ).optional(),
          thursday: Joi.object(
            {
              open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional(),
              close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional()
            }
          ).optional(),
          friday: Joi.object(
            {
              open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional(),
              close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional()
            }
          ).optional(),
          saturday: Joi.object(
            {
              open: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional(),
              close: Joi.string().pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/).optional()
            }
          ).optional(),
        }).required(), // Assuming operation_hours is an object, you can define its structure as needed
        dimension_width: Joi.number().optional(),
        dimension_length: Joi.number().optional(),
        dimension_unit: Joi.number().valid(0, 1).optional(), // 0: Feet, 1: Meters
        elevation_feets: Joi.number().integer().optional(),
        elevation_meters: Joi.number().integer().optional(),
        fuel: Joi.string().optional(),
        lighting: Joi.boolean().optional(),
        orientation: Joi.string().optional(),
        runway_condition: Joi.string().optional(),
        parking: Joi.string().optional(),
        pattern: Joi.string().optional(),
        helicopter_allowed: Joi.boolean().optional(),
        surface: Joi.string().optional(),
        air_nav: Joi.string().uri().optional(),
        ground_transportation: Joi.string().optional(),
        distance_from_runway: Joi.number()
          .precision(2)
          .optional(),
        additional_info: Joi.string().optional()
      })
    )
}

/** SCHEMA:CREATE_BUSINESS_PAYMENT */
const createBusinessPaymentSchema = {
  _id: Joi.string().hex().length(24).optional(),
  business: Joi.string().hex().length(24).required(),
  stripe_customer_id: Joi.string().required(),
  stripe_subscription_id: Joi.string().required(),
  stripe_payment_method: Joi.string().valid("card").required(),
  status: Joi.string().valid("paid", "unpaid").required(),
}

/** SCHEMA:UPDATE_BUSINESS_PAYMENT */
const updateBusinessPaymentSchema = {
  stripe_customer_id: Joi.string().optional(),
  stripe_subscription_id: Joi.string().optional(),
  stripe_payment_method: Joi.string().valid("card").optional(),
  status: Joi.string().valid("paid", "unpaid").optional(),
}

/** SCHEMA:CREATE_BUSINESS_UPLOAD */
const createBusinessUploadSchema = {
  _id: Joi.string().hex().length(24).optional(),
  image: Joi.string().required(),
  business: Joi.string().hex().length(24).required(),
  type: Joi.number().valid(0, 1, 2).required(), // 0: menu 
  is_featured: Joi.number().valid(0, 1).optional(),
};

/** SCHEMA:UPDATE_BUSINESS_UPLOAD */
const updateBusinessUploadSchema = {
  image: Joi.string().optional(),
  type: Joi.number().valid(0, 1, 2).optional(), // 0: menu 
  is_featured: Joi.number().valid(0, 1).optional(),
}

/** SCHEMA:CREATE_CANCELLATION_POLICY */
const createCancellationPolicySchema = {
  _id: Joi.string().hex().length(24).optional(),
  name: Joi.string().min(3).required(),
  type: Joi.number().valid(0, 1, 2).required(), // 0: short, 1: medium, 2: long
  before_check_in: Joi.string().required(),
  after_check_in: Joi.string().required(),
  user: Joi.string().hex().length(24).required(),
}

/** SCHEMA:UPDATE_CANCELLATION_POLICY */
const updateCancellationPolicySchema = {
  name: Joi.string().min(3).optional(),
  type: Joi.number().valid(0, 1, 2).optional(), // 0: short, 1: medium, 2: long
  before_check_in: Joi.date().optional(),
  after_check_in: Joi.date().optional(),
}

/** SCHEMA:CREATE_GALLERY_MEDIA */
const createGalleryMediaSchema = {
  _id: Joi.string().hex().length(24).optional(),
  description: Joi.string().min(3).optional(),
  image: Joi.string().required(),
  sort_order: Joi.number().integer().optional(),
  user: Joi.string().hex().length(24).required(),
  is_active: Joi.boolean().default(true).optional()
}

/** SCHEMA:UPDATE_GALLERY_MEDIA */
const updateGalleryMediaSchema = {
  description: Joi.string().min(3).optional(),
  image: Joi.string().optional(),
  sort_order: Joi.number().integer().optional(),
  is_active: Joi.boolean().default(true).optional()
}

/** SCHEMA:CREATE_COUNTRY */
const createCountrySchema = {
  _id: Joi.string().hex().length(24).optional(),
  name: Joi.string().min(3).required(),
  code: Joi.string().length(2).required(),
  is_active: Joi.boolean().default(true).optional(),
  user: Joi.string().hex().length(24).required()
}

/** SCHEMA:UPDATE_COUNTRY */
const updateCountrySchema = {
  name: Joi.string().min(3).optional(),
  code: Joi.string().length(2).optional(),
  is_active: Joi.boolean().default(true).optional(),
  user: Joi.string().hex().length(24).optional()
}

/** SCHEMA:CREATE_REVIEW */
const createReviewSchema = {
  _id: Joi.string().hex().length(24).optional(),
  rating: Joi.number().min(0).max(5).required(),
  comment: Joi.string().optional(),
  // guest is required for all types of reviews
  guest: Joi.string().hex().length(24).required(),
  // host is required only for host-to-guest and guest-to-host reviews
  host: Joi.when('type', {
    is: Joi.number().valid(2, 3),
    then: Joi.string().hex().length(24).required(),
    otherwise: Joi.valid(null)
  }),
  // business is required only for guest-to-business reviews
  business: Joi.when('type', {
    is: Joi.number().valid(1),
    then: Joi.string().hex().length(24).required(),
    otherwise: Joi.valid(null)
  }),
  // stay is required only for guest-to-stay reviews
  stay: Joi.when('type', {
    is: Joi.number().valid(0),
    then: Joi.string().hex().length(24).required(),
    otherwise: Joi.valid(null)
  }),

  type: Joi.number().valid(0, 1, 2, 3).required(),   // 0: guest-to-stay, 1: guest-to-business, 2: guest-to-host, 3: host-to-guest
  is_active: Joi.boolean().default(true).optional()
}

/** SCHEMA:UPDATE_REVIEW */
const updateReviewSchema = {
  type: Joi.number().valid(0, 1, 2, 3).optional(), // 0: guest-to-stay, 1: guest-to-business, 2: host-to-guest, 3: guest-to-host

  host: Joi.when('type', {
    is: Joi.number().valid(2, 3),
    then: Joi.string().hex().length(24).optional(),
    otherwise: Joi.valid(null)
  }),
  business: Joi.when('type', {
    is: Joi.number().valid(1),
    then: Joi.string().hex().length(24).optional(),
    otherwise: Joi.valid(null)
  }),
  stay: Joi.when('type', {
    is: Joi.number().valid(0),
    then: Joi.string().hex().length(24).optional(),
    otherwise: Joi.valid(null)
  }),
  rating: Joi.number().min(0).max(5).optional(),
  comment: Joi.string().optional(),
  is_active: Joi.boolean().optional()
}

/** SCHEMA:CREATE_SQUAWK */
const createSquawkSchema = {
  _id: Joi.string().hex().length(24).optional(),
  html: Joi.string().required(),
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  cover_image: Joi.string().optional(),
  user: Joi.string().hex().length(24).required(),
}

/** SCHEMA:UPDATE_SQUAWK */
const updateSquawkSchema = {
  html: Joi.string().optional(),
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  cover_image: Joi.string().optional(),
  user: Joi.string().hex().length(24).optional(),
}

/** SCHEMA:CREATE_SQUAWK_CATEGORY */
const createSquawkCategorySchema = {
  _id: Joi.string().hex().length(24).optional(),
  name: Joi.string().min(3).max(50).required(),
  user: Joi.string().hex().length(24).optional(),
  is_active: Joi.boolean().default(true).optional(),
}

/** SCHEMA:UPDATE_SQUAWK_CATEGORY */
const updateSquawkCategorySchema = {
  name: Joi.string().min(3).max(50).optional(),
  is_active: Joi.boolean().optional(),
}

/** SCHEMA:CREATE_SQUAWK_COMMENT */
const createSquawkCommentSchema = {
  _id: Joi.string().hex().length(24).optional(),
  user: Joi.string().hex().length(24).required(),
  squawk: Joi.string().hex().length(24).required(),
  comment: Joi.string().min(1).max(500).required(),
  status: Joi.number().valid(0, 1, 2, 3).optional(), // 0: Inactive, 1: Active, 2: Blocked, 3: Deleted
}

/** SCHEMA:UPDATE_SQUAWK_COMMENT */
const updateSquawkCommentSchema = {
  comment: Joi.string().min(1).max(500).optional(),
  status: Joi.number().valid(0, 1, 2, 3).optional(), // 0: Inactive, 1: Active, 2: Blocked, 3: Deleted
}

/** SCHEMA:CREATE_SQUAWK_TAG */
const createSquawkTagSchema = {
  _id: Joi.string().hex().length(24).optional(),
  name: Joi.string().min(3).max(50).required(),
  user: Joi.string().hex().length(24).optional(),
  is_active: Joi.boolean().default(true).optional(),
}

/** SCHEMA:UPDATE_SQUAWK_TAG */
const updateSquawkTagSchema = {
  name: Joi.string().min(3).max(50).optional(),
  is_active: Joi.boolean().default(true).optional(),
}

/** SCHEMA:CREATE_STAY_CALENDAR */
const createStayCalendarSchema = {
  _id: Joi.string().hex().length(24).optional(),
  block_dates: Joi.array().items(
    Joi.object({
      start_date: Joi.date().required(),
      end_date: Joi.date().required(),
    })
  ).required(),
  provider: Joi.string().required(), // e.g., Airbnb, Booking.com, Vrbo
  type: Joi.number().valid(0, 1).required(),// 0 for blocked, 1 for available
  stay: Joi.string().hex().length(24).required(),
  user: Joi.string().hex().length(24).required(),
}

/** SCHEMA:UPDATE_STAY_CALENDAR */
const updateStayCalendarSchema = {
  block_dates: Joi.array().items(
    Joi.object({
      start_date: Joi.date().required(),
      end_date: Joi.date().required(),
    }).optional()
  ).optional(),
  provider: Joi.string().required(), // e.g., Airbnb, Booking.com, Vrbo
  start_date: Joi.date().optional(),
  end_date: Joi.date().optional(),
  type: Joi.number().valid(0, 1).optional(), // 0 for blocked, 1 for available
}

/** SCHEMA:CREATE_STAY_AIRPORT */
const createAirportSchema = {
  _id: Joi.string().hex().length(24).optional(),
  airport_identifier: Joi.string().required(),
  stay: Joi.string().hex().length(24).required(),
  airport_name: Joi.string().required(),
  airport_use: Joi.number().valid(0, 1).required(), // 0: Public Use, 1: Private Use
  ctaf_unicom: Joi.string().required(),
  dimension_feets: Joi.number().optional(),
  dimension_meters: Joi.number().optional(),
  elevation_feets: Joi.number().integer().optional(),
  elevation_meters: Joi.number().integer().optional(),
  fuel: Joi.string().optional(),
  lighting: Joi.boolean().optional(),
  operation_hours: Joi.string().optional(),
  orientation: Joi.string().optional(),
  runway_condition: Joi.string().optional(),
  parking: Joi.string().optional(),
  pattern: Joi.string().optional(),
  surface: Joi.string().optional(),
  air_nav: Joi.string().uri().optional(),
  ground_transportation: Joi.string().optional(),
  distance_from_runway: Joi.number().precision(2).optional(),
  additional_info: Joi.string().optional()
}

/** SCHEMA:UPDATE_STAY_AIRPORT */
const updateAirportSchema = {
  airport_identifier: Joi.string().optional(),
  airport_name: Joi.string().optional(),
  airport_use: Joi.number().valid(0, 1).optional(), // 0: Public Use, 1: Private Use
  ctaf_unicom: Joi.string().optional(),
  dimension_feets: Joi.number().optional(),
  dimension_meters: Joi.number().optional(),
  elevation_feets: Joi.number().integer().optional(),
  elevation_meters: Joi.number().integer().optional(),
  fuel: Joi.string().optional(),
  lighting: Joi.boolean().optional(),
  operation_hours: Joi.string().optional(),
  orientation: Joi.string().optional(),
  runway_condition: Joi.string().optional(),
  parking: Joi.string().optional(),
  pattern: Joi.string().optional(),
  surface: Joi.string().optional(),
  air_nav: Joi.string().uri().optional(),
  ground_transportation: Joi.string().optional(),
  distance_from_runway: Joi.number().precision(2).optional(),
  additional_info: Joi.string().optional()
}

// SCHEMA:CREATE_BOOKING_EXPENSE - JOI
const createBookingExpenseSchema = {
  _id: Joi.string().hex().length(24).optional(),
  user: Joi.string().hex().length(24).required(),
  stay: Joi.string().hex().length(24).required(),
  guests: Joi.number().required(),
  bed: Joi.number().required(),
  bed_type: Joi.number().required(),
  name: Joi.string().required(),
}

// SCHEMA:UPDATE_BOOKING_EXPENSE - JOI
const updateBookingExpenseSchema = {
  guests: Joi.number().optional(),
  name: Joi.string().optional(),
  bed: Joi.number().optional(),
  bed_type: Joi.number().optional(),
}

/** SCHEMA:CREATE_BOOKING */
const createBookingSchema = {
  _id: Joi.string().hex().length(24).optional(),
  user: Joi.string().length(24).hex().required(),
  stay: Joi.string().length(24).hex().required(),
  arrival_date: Joi.date().required(),
  departure_date: Joi.date().required(),
  no_of_guests: Joi.number().integer().min(1).required(),
  note: Joi.string().optional(),
  status: Joi.number().valid(0, 1, 1).optional(), // 0: Pending, 1: Completed, 2: Cancelled
  transaction_id: Joi.number().integer().optional(),
  invoice_id: Joi.number().integer().optional(),
  no_of_infants: Joi.number().integer().min(0).optional(),
  no_of_pets: Joi.number().integer().min(0).optional(),
  no_of_childrens: Joi.number().integer().min(0).optional(),
  amount: Joi.number().precision(2).required(),
  taxes: Joi.number().integer().optional(),
  meta_data: Joi.string().optional()
}

/** SCHEMA: Get booking Quote **/
const quoteBookingSchema = {
  stay: Joi.string().hex().length(24).required(),
  no_of_guests: Joi.object({
    adults: Joi.number().integer().min(1).required(),
    children: Joi.number().integer().min(0).required(),
    infants: Joi.number().integer().min(0).required(),
    pets: Joi.number().integer().min(0).required(),
  }).required(),
  arrival_date: Joi.date().iso().optional(),
  departure_date: Joi.date().iso().optional(),
  extraServicesTotal: Joi.number().min(0).default(0),
};

/** SCHEMA:UPDATE_BOOKING */
const updateBookingSchema = {
  arrival_date: Joi.date().iso().optional(),
  departure_date: Joi.date().iso().optional(),
  no_of_guests: Joi.number().integer().min(1).optional(),
  note: Joi.string().optional(),
  status: Joi.number().valid(0, 1, 2).optional(), // 0: Pending, 1: Completed, 2: Cancelled
  transaction_id: Joi.number().integer().optional(),
  invoice_id: Joi.number().integer().optional(),
  no_of_infants: Joi.number().integer().min(0).optional(),
  no_of_pets: Joi.number().integer().min(0).optional(),
  no_of_childrens: Joi.number().integer().min(0).optional(),
  amount: Joi.number().precision(2).optional(),
  taxes: Joi.number().integer().optional(),
  meta_data: Joi.string().optional()
}

/** SCHEMA:CREATE_POST_CHECKOUT */
const createPostCheckoutChargesSchema = {
  _id: Joi.string().hex().length(24).optional(),
  reason: Joi.string().required(),
  amount: Joi.number().required(),
  situation_description: Joi.string().required(),
  booking: Joi.string().hex().length(24).required(),
  user: Joi.string().hex().length(24).required(), // host - who created the post checkout charge
  status: Joi.number().valid(0, 1, 2).required(), // 0 - pending, 1 - approved, 2 - rejected
  images: Joi.array().items(Joi.string()).optional(),
}

/** SCHEMA:UPDATE_POST_CHECKOUT */
const updatePostCheckoutChargesSchema = {
  reason: Joi.string().optional(),
  amount: Joi.number().optional(),
  situation_description: Joi.string().optional(),
  status: Joi.string().valid(0, 1, 2).optional(), // 0 - pending, 1 - approved, 2 - rejected
  images: Joi.array().items(Joi.string()).optional(),
}

/** SCHEMA:CREATE_BOOKING_TRANSACTION */
const createBookingTransactionSchema = {
  _id: Joi.string().hex().length(24).optional(),
  user: Joi.string().length(24).hex().required(),
  payment_method_id: Joi.string().required(),
  payment_intent_id: Joi.string().required(),
  // ["card", "bank_transfer", "cash"]
  payment_method_type: Joi.string().valid("card", "bank_transfer", "cash").optional(),
  transaction_reference: Joi.string().required(),
  amount: Joi.number().required(),
  taxes: Joi.number().optional(),
  type: Joi.number().valid(0, 1).required(), // 0: CREDIT, 1: DEBIT
  status: Joi.number().valid(0, 1, 2).required(), // 0: PENDING, 1: SUCCESS, 2: DECLINED
  purpose: Joi.number().valid(0, 1).required(), // 0: BOOKING, 1: REFUND
  meta_data: Joi.string().optional(),
};

/** SCHEMA:UPDATE_BOOKING_TRANSACTION */
const updateBookingTransactionSchema = {
  payment_method_id: Joi.string().optional(),
  payment_intent_id: Joi.string().optional(),
  // ["card", "bank_transfer", "cash"]
  payment_method_type: Joi.string().valid("card", "bank_transfer", "cash").optional(),
  transaction_reference: Joi.string().optional(),
  amount: Joi.number().optional(),
  taxes: Joi.number().optional(),
  type: Joi.number().valid(0, 1).optional(), // 0: CREDIT, 1: DEBIT
  status: Joi.number().valid(0, 1, 2).optional(), // 0: PENDING, 1: SUCCESS, 2: DECLINED
  purpose: Joi.number().valid(0, 1).optional(), // 0: BOOKING, 1: REFUND
  meta_data: Joi.string().optional(),
};

/** SCHEMA:CREATE_STAY_EXTRA_SERVICE */
const createStayExtraServiceSchema = {
  _id: Joi.string().hex().length(24).optional(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  name: Joi.string().required(),
  service_type: Joi.string().hex().length(24).required(),
  stay: Joi.string().hex().length(24).required(),
  user: Joi.string().hex().length(24).required()
}

/** SCHEMA:UPDATE_STAY_EXTRA_SERVICE */
const updateStayExtraServiceSchema = {
  price: Joi.number().optional(),
  quantity: Joi.number().optional(),
  name: Joi.string().optional(),
}

/** SCHEMA:CREATE_FAVOURITE_STAY */
const createFavouriteSchema = {
  _id: Joi.string().hex().length(24).optional(),
  user: Joi.string().length(24).hex().required(),
  stay: Joi.string().length(24).hex().required(),
}

/** SCHEMA:CREATE_STAY_FEATURE */
const createStayFeatureSchema = {
  _id: Joi.string().hex().length(24).optional(),
  name: Joi.string().min(3).max(50).required(),
  parent: Joi.string().hex().length(24).optional(),
  user: Joi.string().hex().length(24).optional(),
}

/** SCHEMA:UPDATE_STAY_FEATURE */
const updateStayFeatureSchema = {
  name: Joi.string().min(3).max(50).optional(),
  parent: Joi.string().hex().length(24).optional(),
  is_active: Joi.boolean().optional(),
}

/** SCHEMA:CREATE_STAY_IMAGE */
const createStayImageSchema = {
  _id: Joi.string().hex().length(24).optional(),
  description: Joi.string().min(3).optional(),
  image: Joi.string().required(),
  sort_order: Joi.number().integer().optional(),
  stay: Joi.string().hex().length(24).required(),
  is_active: Joi.boolean().default(true).optional()
}

/** SCHEMA:UPDATE_STAY_IMAGE */
const updateStayImageSchema = {
  description: Joi.string().min(3).optional(),
  image: Joi.string().optional(),
  sort_order: Joi.number().integer().optional(),
  is_active: Joi.boolean().default(true).optional()
}

/** SCHEMA:CREATE_STAY_PLACE_TYPE  */
const createStayPlaceTypeSchema = {
  _id: Joi.string().hex().length(24).optional(),
  name: Joi.string().required(),
  user: Joi.string().required(),
  is_active: Joi.boolean().default(true),
}

/** SCHEMA:UPDATE_STAY_PLACE_TYPE */
const updateStayPlaceTypeSchema = {
  name: Joi.string().optional(),
  is_active: Joi.boolean().optional(),
}

/** SCHEMA:CREATE_STAY_SPACE_TYPE  */
const createStaySpaceTypeSchema = {
  _id: Joi.string().hex().length(24).optional(),
  name: Joi.string().required(),
  user: Joi.string().required(),
  is_active: Joi.boolean().default(true),
}

/** SCHEMA:UPDATE_STAY_SPACE_TYPE */
const updateStaySpaceTypeSchema = {
  name: Joi.string().optional(),
  is_active: Joi.boolean().optional(),
}

/** SCHEMA:CREATE_STAY_SERVICE_TYPE - JOI */
const createStayServiceSchema = {
  _id: Joi.string().hex().length(24).optional(),
  name: Joi.string().min(3).required(),
  user: Joi.string().required(), // Assuming user is a string ID
  parent: Joi.string().optional(), // Optional parent ID
  is_active: Joi.boolean().default(true), // Default to true if not provided
}

/** SCHEMA:UPDATE_STAY_SERVICE - JOI */
const updateStayServiceSchema = {
  name: Joi.string().min(3).optional(),
  user: Joi.string().optional(), // Assuming user is a string ID
  parent: Joi.string().optional(), // Optional parent ID
  is_active: Joi.boolean().optional(), // Optional, if not provided, it won't change
}

/** SCHEMA:CREATE_SURFACE_TYPE  */
const createSurfaceTypeSchema = {
  _id: Joi.string().hex().length(24).optional(),
  name: Joi.string().required(),
  user: Joi.string().required(),
  is_active: Joi.boolean().default(true),
}

/** SCHEMA:UPDATE_SURFACE_TYPE */
const updateSurfaceTypeSchema = {
  name: Joi.string().optional(),
  is_active: Joi.boolean().optional(),
}

/** SCHEMA:CREATE_TESTIMONIAL */
const createTestimonialSchema = {
  _id: Joi.string().hex().length(24).optional(),
  name: Joi.string().required(),
  photo: Joi.string().uri().optional(),
  occupation: Joi.string().min(3).max(50).optional(),
  testimonial: Joi.string().min(10).max(500).required(),
  user: Joi.string().hex().length(24).optional(),
  is_active: Joi.boolean().optional(),
  created_at: Joi.date().optional(),
  updated_at: Joi.date().optional(),
}

/** SCHEMA:UPDATE_TESTIMONIAL */
const updateTestimonialSchema = {
  name: Joi.string().optional(),
  photo: Joi.string().uri().optional(),
  occupation: Joi.string().min(3).max(50).optional(),
  testimonial: Joi.string().min(10).max(500).optional(),
  is_active: Joi.boolean().optional(),
  created_at: Joi.date().optional(),
  updated_at: Joi.date().optional(),
}


export {
  createBusinessTypeSchema,
  updateBusinessTypeSchema,
  updateUserSchema,
  signUpSchema,
  loginSchema,
  resetPasswordSchema,
  changePasswordSchema,
  createBusinessSchema,
  updateBusinessSchema,
  createStaySchema,
  updateStaySchema,
  createBusinessPaymentSchema,
  updateBusinessPaymentSchema,
  createBusinessUploadSchema,
  updateBusinessUploadSchema,
  createCancellationPolicySchema,
  updateCancellationPolicySchema,
  createCountrySchema,
  updateCountrySchema,
  createGalleryMediaSchema,
  updateGalleryMediaSchema,
  createReviewSchema,
  updateReviewSchema,
  createSquawkSchema,
  updateSquawkSchema,
  createSquawkCategorySchema,
  updateSquawkCategorySchema,
  createSquawkCommentSchema,
  updateSquawkCommentSchema,
  createSquawkTagSchema,
  updateSquawkTagSchema,
  createStayCalendarSchema,
  updateStayCalendarSchema,
  createAirportSchema,
  updateAirportSchema,
  createBookingExpenseSchema,
  updateBookingExpenseSchema,
  createBookingSchema,
  quoteBookingSchema,
  updateBookingSchema,
  createPostCheckoutChargesSchema,
  updatePostCheckoutChargesSchema,
  createBookingTransactionSchema,
  updateBookingTransactionSchema,
  createStayExtraServiceSchema,
  updateStayExtraServiceSchema,
  createFavouriteSchema,
  createStayFeatureSchema,
  updateStayFeatureSchema,
  createStayImageSchema,
  updateStayImageSchema,
  createStayPlaceTypeSchema,
  updateStayPlaceTypeSchema,
  createStayServiceSchema,
  updateStayServiceSchema,
  createStaySpaceTypeSchema,
  updateStaySpaceTypeSchema,
  createSurfaceTypeSchema,
  updateSurfaceTypeSchema,
  createTestimonialSchema,
  updateTestimonialSchema,
  createMessageSchema,
  updateMessageSchema,
  createChatSchema,
  updateChatSchema
}
