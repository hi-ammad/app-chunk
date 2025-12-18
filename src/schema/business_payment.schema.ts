import { EModalNames } from "@/enum";
import { Schema } from "mongoose";

export default new Schema<IBusinessPayment>({
  business: {
    type: Schema.Types.ObjectId,
    ref: EModalNames.BUSINESS,
    required: true,
  },
  stripe_customer_id: {
    type: String,
    required: true,
  },
  stripe_subscription_id: {
    type: String,
    required: true,
  },
  stripe_payment_method: {
    type: String,
    enum: ["card"],
    default: "card",
    required: true,
  },
  status: {
    type: String,
    enum: ["paid", "unpaid", "cancelled"],
    default: "unpaid",
    required: true,
  },
}, {
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
});

