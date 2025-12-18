import { EModalNames } from "@/enum";
import { Schema } from "mongoose";

export default new Schema<ISquawkTag>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: EModalNames.USER,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
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
      transform: (__, ret, ___) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
)
