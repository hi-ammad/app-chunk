import { Schema } from "mongoose";

export default new Schema<IChat>({

  participent_1: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  participent_2: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  booking: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "archived"],
    default: "active",
    required: true,
  },
}, {
  timestamps: true,
  toJSON: {
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
    virtuals: true,
    getters: true,
    versionKey: false,
  },
  toObject: {
    virtuals: true,
    getters: true,
    versionKey: false,
  },
});
