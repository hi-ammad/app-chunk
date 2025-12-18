import { Schema } from "mongoose";

export default new Schema<ISquawk>({
  title: {
    type: String,
    required: false,
  },
  cover_image: {
    type: String,
    required: false,
  },
  html: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: false,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
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

