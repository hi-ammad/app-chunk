import { EModalNames } from "@/enum";
import { Schema } from "mongoose";

const blockDateSchema = new Schema({
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  }
}, {
  _id: false, // Disable automatic _id generation for this subdocument
});

export default new Schema<IStayCalendar>({
  block_dates: [blockDateSchema],
  provider: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: Number,
    enum: [0, 1], // 0 for blocked, 1 for available
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
