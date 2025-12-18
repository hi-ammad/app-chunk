import { EModalNames } from "@/enum";
import { Schema, SchemaTypes } from "mongoose";

export default new Schema<IGalleryMedia>({
  description: {
    type: String,
    minlength: 3,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  sort_order: {
    type: Number,
    integer: true,
    required: false,
  },
  user: {
    type: SchemaTypes.ObjectId,
    ref: EModalNames.USER,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
    required: false,
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
