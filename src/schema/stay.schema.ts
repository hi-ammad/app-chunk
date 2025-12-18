/**
 * NOT_A_GOOD_APPROACH
 * All the schema related to stays should not be in this file
 * Temporary solution until we refactor the codebase (v2)
 * use individual module apis / version2
 * */

import { EModalNames } from "@/enum";
import { Schema } from "mongoose";
import { pointSchema } from "./util.schema";
import { StayCalendar } from "@/modal";

const addressSchema = new Schema({
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: { type: Number, required: true },
  area: { type: String, required: false },
  address: { type: String, required: true },
  apartment: { type: String, required: false },
  location: {
    type: pointSchema,
    index: "2dsphere", // For geospatial queries
    required: true,
  },
  fake_location: {
    type: pointSchema,
    index: "2dsphere", // For geospatial queries
    required: false,
  },
},
  {
    toJSON: {
      transform(_, ret, __) {
        delete ret._id;
        delete ret.location;
        return ret;
      },
      versionKey: false,
    },
  }
)
const pricingSchema = new Schema({
  nightly_price: { type: Number, required: true }, // in currency units
  cleaning_fee: { type: Number, default: 0 }, // in currency units
  city_fee: { type: Number, default: 0 }, // in currency units
  city_fee_frequency: { type: String, }, // true if fixed amount, false if percentage 
  cleaning_fee_frequency: { type: String, }, // true if fixed amount, false if percentage
  tax_percentage: { type: Number, default: 0 }, // percentage value
  apply_weekend_price:
  {
    type:
      String,
    enum:
      ["Saturday & Sunday", "Friday & Saturday", "Saturday", "Sunday"],
    default:
      "Saturday & Sunday",
  }, // e.g., "Saturday & Sunday"
  weekend_nightly_price:
  {
    type:
      Number,
    default:
      0,
  }, // in currency units
  nightly_price_seven_plus:
  {
    type:
      Number,
    default:
      0,
  }, // in currency units
  nightly_price_thirty_plus:
  {
    type:
      Number,
    default:
      0,
  }, // in currency units
},
  {
    _id: false,
  }
)
const timeRangeSchema = new Schema({
  open: {
    type: String, // Format: "HH:mm"
    match: /^([0-1]\d|2[0-3]):([0-5]\d)$/ // Validates 24-hour time
  },
  close: {
    type: String,
    match: /^([0-1]\d|2[0-3]):([0-5]\d)$/
  }
}, { _id: false });

const hoursSchema = new Schema({
  monday: timeRangeSchema,
  tuesday: timeRangeSchema,
  wednesday: timeRangeSchema,
  thursday: timeRangeSchema,
  friday: timeRangeSchema,
  saturday: timeRangeSchema,
  sunday: timeRangeSchema
}, { _id: false });

const ruleSchema = new Schema({
  smoking_allowed: { type: Boolean, required: true },
  party_allowed: { type: Boolean, required: true },
  instant_booking: { type: Boolean, required: true, default: false },
  children_allowed: { type: Boolean, required: true },
  children_start_age: { type: Number, required: false }, // Age from which children are considered
  children_end_age: { type: Number, required: false }, // Age until which children are considered
  infant_start_age: { type: Number, required: false }, // Age from which infants are considered
  infant_end_age: { type: Number, required: false }, // Age until which infants
  pets_allowed: { type: Boolean, required: true },
  additional_guest_allowed: { type: Boolean, required: true },
  cancellation_policy_short: {
    type: String,
    required: true,
  },
  cancellation_policy_long: {
    type: String,
    required: true,
  },
  min_day_booking: {
    type: Number,
    required: true, // Minimum 1 day booking
  },
  max_day_booking: {
    type: Number,
    required: true, // Maximum 30 days booking
  },
  check_in_after: {
    type: String,
    required: true, // e.g., "14:00"
  },
  check_out_before: {
    type: String,
    required: true, // e.g., "14:00"
  },
  rules: { type: [String] }, // General rules for the stay
},
  {
    _id: false
  }
)
const customePricingSchema = new Schema({
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  nightly_price: { type: Number, required: true }, // in currency units
  weekend_nightly_price: { type: Number, required: true }, // in currency units
  price_additional_guest: { type: Number, required: true }, // in currency units
},
  {
    _id: false,
  }
)

const airportSchema = new Schema({
  identifier: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  use: {
    type: Number,
    required: true, // 0: Public_Use, 1: Private_Use, 2: Private - Permission Required
  },
  ctaf_unicom: {
    type: String,
    required: true, // CTAF/UNICOM frequency
  },
  lighting: {
    type: Boolean,
    default: false,
  },
  fuel: {
    type: String,
    required: true,
  },
  parking: {
    type: String,
    required: true
  },
  orientation: {
    type: String,
    required: true, // e.g., "18/36"
  },
  dimension_length: {
    type: Number,
    required: true,
  },
  dimension_width: {
    type: Number,
    required: true,
  },
  dimension_unit: {
    type: Number,
    enum: [0, 1], // 0: Feet, 1: Meters
    required: true,
  },
  surface: {
    type: String,
    default: null,
  },
  runway_condition: {
    type: String,
    required: true
  },
  pattern: {
    type: String,
    required: true
  },
  elevation_start: {
    type: Number,
    required: true,
  },
  elevation_end: {
    type: Number,
    required: true,
  },
  distance_from_runway: {
    type: Number,
    precision: 2,
    default: null
  },
  air_nav: {
    type: String, // URI
  },
  operation_hours: {
    type: hoursSchema,
    required: true,
  },
  helicopter_allowed: {
    type: Boolean,
    default: false,
  },
  ground_transportation: {
    type: String,
  },
  additional_info: {
    type: String,
    default: null
  }
},
  {
    _id: false,
  }
)

const calendarSchema = new Schema({
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  type: {
    type: Number,
    enum: [0, 1], // 0 for blocked, 1 for available
    required: true,
  },
},
  {
    _id: false,
  }
)

const bedroomSchema = new Schema({
  name: { type: String, required: true },
  no_of_guest: { type: Number, required: true },
  no_of_beds: { type: Number, required: true },
  bed_type: { type: Number, required: true }, // 0: Single, 1: Double, 2: Queen, 3: King
},
  {
    _id: false,
  }
)

const extraServiceSchema = new Schema({
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  service_type: {
    type: String,
    required: true,
  },
},
  {
    _id: false,
  }
)

const imageSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  sort_order: {
    type: Number,
    integer: true,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
    required: true,
  },
},
  {
    _id: false,
  }
)

export default new Schema<IStay>(
  {
    user: { type: Schema.Types.ObjectId, ref: EModalNames.USER, required: true },
    rental_type: { type: String, required: true }, // e.g., "Apartment", "House", etc.
    calendar: {
      // type: [{ type: Schema.Types.ObjectId, ref: EModalNames.STAY_CALENDAR }],
      type: [calendarSchema],
      required: false, // 
    },
    is_draft: { type: Boolean, default: false }, // Indicates if the stay is a draft
    address: {
      type: addressSchema,
      required: true,
    },
    images: {
      type: [imageSchema],
      required: true, // At least one image is required
    },
    space_type: { type: String, required: true }, // e.g., "Entire home/apt", "Private room", etc.
    stay_type: {
      type: String,
      required: true,
    },
    stay_title: { type: String, required: true },
    no_of_guest: { type: Number, required: true },
    no_of_bedrooms: { type: Number, required: true },
    no_of_beds: { type: Number, required: true },
    no_of_bathrooms: { type: Number, required: true },
    no_of_rooms: { type: Number, default: 0 },
    size: { type: Number, default: 0 }, // in sqm
    unit_of_measure: { type: String, required: true }, // e.g., sqm
    description: { type: String, required: true },
    bedrooms: {
      type: [bedroomSchema],
      required: true,
    },
    airports: {
      type: [airportSchema],
      required: true, // At least one airport is required
    },
    pricing: {
      type: pricingSchema,
      required: true,
    },
    custom_pricing: {
      type: [customePricingSchema],
      required: true, // Optional custom pricing
    },
   // calendar: { type: [calendarSchema], required: false},
    extra_services: [extraServiceSchema],
    features: [String],
    rules: { type: ruleSchema, required: true },
    welcome_message: { type: String }, // Welcome message for guests
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret, __) {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
      versionKey: false,
      virtuals: true,
    },
    toObject: { virtuals: true },
  }
)
