
import { EModalNames } from "@/enum";
import { Schema } from "mongoose";

export default new Schema<IReview>(
  {
    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: false,
    },
    type: {
      type: Number,
      enum: [0, 1, 2, 3], // 0: guest-to-stay, 1: guest-to-business, 2: guest-to-host, 3: host-to-guest
      required: true,
    },
    guest: {
      type: Schema.Types.ObjectId,
      ref: EModalNames.USER,
      required: false,
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: EModalNames.USER,
      required: false,
    },
    business: {
      type: Schema.Types.ObjectId,
      ref: EModalNames.BUSINESS,
      required: false,
    },
    stay: {
      type: Schema.Types.ObjectId,
      ref: EModalNames.STAY!,
      required: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
)
