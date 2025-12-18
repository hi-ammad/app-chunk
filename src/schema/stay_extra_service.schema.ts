import { EModalNames } from "@/enum";
import { Schema } from "mongoose";

export default new Schema<IStayExtraService>({
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
  service_type: {
    type: Schema.Types.ObjectId,
    ref: EModalNames.SERVICE_TYPE,
    required: true,
  },
  stay: {
    type: Schema.Types.ObjectId,
    ref: EModalNames.STAY,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: EModalNames.USER,
    required: true,
  }
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
})
