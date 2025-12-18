import { EModalNames } from "@/enum";
import { Schema } from "mongoose";

export default new Schema<IStayFeature>(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: EModalNames.USER, // Reference to the User model
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: EModalNames.STAY_FEATURE, // Reference to the same model for parent-child relationship
    },
    is_active: {
      type: Boolean,
      default: true, // Default value for is_active
    }
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
