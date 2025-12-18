import { Schema } from "mongoose";

export default new Schema<ICancellationPolicy>({
  name: { type: String, required: true, minlength: 3 },
  type: { type: Number, required: true, enum: [0, 1, 2] }, // 0: short, 1: medium, 2: long
  before_check_in: { type: String, required: true },
  after_check_in: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
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
