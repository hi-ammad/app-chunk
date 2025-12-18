import { EModalNames } from "@/enum";
import { Schema } from "mongoose";

export default new Schema<ISquawkComment>({
  user: {
    type: Schema.Types.ObjectId,
    ref: EModalNames.USER,
    required: true
  },
  squawk: {
    type: Schema.Types.ObjectId,
    ref: EModalNames.SQUAWK_COMMENT,
    required: true
  },
  comment: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 1, // Default to Active
    enum: [0, 1, 2, 3] // Inactive, Active, Blocked, Deleted
  }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: (_, ret, __) => {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
  },
  toObject: { virtuals: true },
})

