import { EModalNames } from "@/enum";
import { Schema, SchemaTypes } from "mongoose";
import { pointSchema } from "./util.schema";

const addressSchema = new Schema({
  country: { type: String, },
  state: { type: String, },
  city: { type: String, },
  zipcode: { type: Number, },
  area: { type: String, },
  address: { type: String, },
  apartment: { type: String, },
  location: {
    type: pointSchema,
    index: "2dsphere", // For geospatial queries
  },
},
  {
    _id: false
  }
)

const imageSchema = new Schema({
  description: {
    type: String,

  },
  image: {
    type: String,
  },
  sort_order: {
    type: Number,
    integer: true,

  },
  is_active: {
    type: Boolean,
    default: true,

  },
},
  {
    _id: false
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

export default new Schema<IBusiness>({
  user: { type: SchemaTypes.ObjectId, ref: EModalNames.USER, required: true, }, // reference to User schema
  name: { type: String, minlength: 3 },
  address: { type: addressSchema, },
  images: { type: [imageSchema], },
  logo: { type: String, }, // path to the business logo image
  business_type: { type: [SchemaTypes.ObjectId], ref: "BusinessType", }, // reference to BusinessType schema
  description: { type: String, },
  tagline: { type: String, },
  operation_hours: { type: hoursSchema, },
  url: { type: String, }, // website URL
  phone: { type: String, },
  airport: { type: String, },
  distance_from_runway: { type: Number, }, // in meters
  isPaid: { type: Boolean, }, // indicates if the business is paid or not
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform(_, ret) {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }
  },
  toObject: { virtuals: true }
})

