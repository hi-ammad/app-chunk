import { Schema } from "mongoose";

export default new Schema<IBusinessUpload>({
  image: {
    type: String,
    required: true,
  },
  business: {
    type: Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  },
  type: {
    type: Number,
    enum: [0, 1, 2], // 0: menu, 1: logo, 2: banner
    required: true,
  },
  is_featured: {
    type: Boolean,
    default: false, // Indicates if the upload is featured
  },
},
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);
