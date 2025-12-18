import { Schema } from "mongoose";

export default new Schema<IBooking>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  stay: {
    type: Schema.Types.ObjectId,
    ref: "Stay",
    required: true,
  },
  arrival_date: {
    type: Date,
    required: true,
  },
  departure_date: {
    type: Date,
    required: true,
  },
  no_of_guests: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
    default: "",
  },
  status: {
    type: Number, // 0: Pending, 1: Completed, 2: Cancelled
    default: 0, // Default to Pending
  },
  transaction_id: {
    type: Number,
    default: null,
  },
  invoice_id: {
    type: Number,
    default: null,
  },
  no_of_infants: {
    type: Number,
    default: 0,
  },
  no_of_pets: {
    type: Number,
    required: false,
  },
  no_of_childrens: {
    type: Number,
    required: false,
  },
  amount: {
    type: Number,
    required: true,
  },
  taxes: {
    type: Number,
    default: null,
  },
  meta_data: {
    type: String,
    default: "",
  }
}, {
  toJSON: {
    transform(_, ret, __) {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
    versionKey: false,
    virtuals: true,
  },
  toObject: { virtuals: true }, timestamps: true
});
