import { EModalNames } from "@/enum";
import { Schema, SchemaTypes } from "mongoose";
export default new Schema<IPostCheckout>({
  images: {
    type: [String],
    default: [],
  },
  reason: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  situation_description: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: EModalNames.USER,
    required: true,
  },

  booking: {
    type: Schema.Types.ObjectId,
    ref: EModalNames.USER,
    required: true,
  },
  status: {
    type: Number,
    enum: [0, 1, 2], // 0 - pending, 1 - approved, 2 - rejected
    default: 0,
  },
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
);
