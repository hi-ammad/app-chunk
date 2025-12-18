import { Schema } from "mongoose";

export const pointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point',
    required: false
  },
  coordinates: {
    type: [Number],
    required: true
  }
}, {
  toJSON: {
    transform: (_, ret) => {
      delete ret._id;
      delete ret.id;
      return ret;
    }
  }
});

export const addressSchema = new Schema({
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

export const hoursSchema = new Schema({
  monday: timeRangeSchema,
  tuesday: timeRangeSchema,
  wednesday: timeRangeSchema,
  thursday: timeRangeSchema,
  friday: timeRangeSchema,
  saturday: timeRangeSchema,
  sunday: timeRangeSchema
}, { _id: false });
