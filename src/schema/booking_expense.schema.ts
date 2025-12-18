import { EModalNames } from "@/enum";
import { Schema } from "mongoose";

export default new Schema<IBookingExpense>({
  name: {
    type: String,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  bed: {
    type: Number,
    required: true,
  },
  bed_type: {
    type: Number,
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
