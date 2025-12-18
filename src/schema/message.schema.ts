
import { Schema } from "mongoose";

export default new Schema<IMessage>({
  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["sent", "delivered", "read"],
    default: "sent",
  },
}, {
  timestamps: true,
  toJSON: {
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
    virtuals: true,
    getters: true,
    versionKey: false,
  },
  toObject: {
    virtuals: true,
    getters: true,
    versionKey: false,
  },
});
