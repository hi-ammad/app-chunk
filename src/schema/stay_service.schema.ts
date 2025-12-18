
import { EModalNames } from "@/enum";
import { Schema } from "mongoose";

export default new Schema<IStayServiceType>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: EModalNames.USER,
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: EModalNames.STAY_SERVICE,
      default: null,
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
)

