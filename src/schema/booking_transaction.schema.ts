import { EModalNames } from "@/enum";
import { Schema, SchemaTypes } from "mongoose";

export default new Schema<IBookingTransaction>({
  user: { type: SchemaTypes.ObjectId, required: true, ref: EModalNames.USER },
  payment_method_id: { type: String, required: true },
  payment_intent_id: { type: String, required: true },
  payment_method_type: {
    type: String,
    enum: ["card", "bank_transfer", "cash"],
    required: true,
  },
  transaction_reference: { type: String, required: true },
  amount: { type: Number, required: true },
  taxes: { type: Number, default: 0 },
  type: {
    type: Number,
    enum: [0, 1], // 0 for CREDIT, 1 for DEBIT
    required: true,
  },
  status: {
    type: Number,
    enum: [0, 1, 2], // 0 for PENDING, 1 for SUCCESS, 2 for DECLINED
    required: true,
  },
  purpose: {
    type: Number,
    enum: [0, 1], // 0 for BOOKING, 1 for REFUND
    required: true,
  },
  meta_data: { type: String, default: "" },

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
