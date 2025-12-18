import { EModalNames } from "@/enum";
import { Schema } from "mongoose";

export default new Schema<IStaySurfaceType>(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: EModalNames.USER,
    },
    is_active: {
      type: Boolean,
      default: true,
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
