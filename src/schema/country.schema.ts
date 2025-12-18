import { Constant } from "@/constants";
import { EModalNames } from "@/enum";
import { Schema } from "mongoose";

export default new Schema<ICountry>(
  {
    name: {
      type: String,
      required: true,
      unique: Constant.instance.server.nodeEnv === 'test' ? false : true,
    },
    code: {
      type: String,
      required: true,
      unique: Constant.instance.server.nodeEnv === 'test' ? false : true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: EModalNames.USER,
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

