import { EModalNames } from "@/enum";
import { Schema } from "mongoose";

export default new Schema<IUserFavStay>({
  user: {
    type: Schema.Types.ObjectId,
    ref: EModalNames.USER,
    required: true,
  },
  stay: {
    type: Schema.Types.ObjectId,
    ref: EModalNames.STAY,
    required: true,
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
