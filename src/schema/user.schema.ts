import { Schema } from "mongoose";
import {
  changePasswordAfter,
  comparePassword,
  createPasswordReset,
  hashPasswordBeforeSave,
  hashPasswordBeforeUpdate,
} from "@/middleware/mongo";

import { EUserRole } from "@/enum";
import { getUserCompleteInPercentage } from "@/library/utils";

const socialLinksSchema = new Schema({
  facebook_url: {
    type: String,
    required: false,
  },
  twitter_url: {
    type: String,
    required: false,
  },
  linkedin_url: {
    type: String,
    required: false,
  },
  instagram_url: {
    type: String,
    required: false,
  },
  pinterest_url: {
    type: String,
    required: false,
  },
  youtube_url: {
    type: String,
    required: false,
  },

  vimeo_url: {
    type: String,
    required: false,
  },
  airbnb_url: {
    type: String,
    required: false,
  },
  top_advisor_url: {
    type: String,
    required: false,
  },
}, { _id: false });

const mailingAddressSchema = new Schema({
  address: {
    type: String,
    required: false,
  },
  apartment: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  zip_code: {
    type: String,
    required: false,
  },
  neighbourhood: {
    type: String,
    required: false,
  },

  area: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
}, { _id: false });

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
    required: true,
  },
}, { _id: false })

export default new Schema<IUser, UserModel, IUserMethods>(
  {
    first_name: {
      type: String,
      required: false,
    },

    middle_name: {
      type: String,
      required: false,
    },
    last_name: {
      type: String,
      required: false,
    },

    display_name: {
      type: String,
      required: false,
    },

    native_language: {
      type: String,
      required: false,
    },

    phone: {
      type: String,
      required: false,
    },

    verification_string: {
      type: String,
      required: false,
    },

    status: {
      enum: [0, 1, 2],
      type: Number,
      default: 0, // 0 - inactive, 1 - active, 2 - blocked
    },

    other_phone: {
      type: String,
      required: false,
    },

    other_language: {
      type: [String],
      required: false,
    },

    email: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    additional_email: {
      type: String,
      required: false,
    },
    airmen_verified: {
      type: Boolean,
      required: false,
    },
    airmen_certificate_front: {
      type: String,
      required: false,
    },
    airmen_certificate_back: {
      type: String,
      required: false,
    },

    driving_license_front: {
      type: String,
      required: false,
    },

    driving_license_back: {
      type: String,
      required: false,
    },
    driving_license_verified: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      required: false,
    },
    mailing_address: {
      type: mailingAddressSchema,
      required: false,
    },
    contact: {
      type: contactSchema,
      required: false,
    },
    social_links: {
      type: socialLinksSchema,
      required: false,
    },
    photo: {
      type: String,
      required: false,
    },
    id_verified: {
      type: Boolean,
      default: false,
    },
    email_verified: {
      type: Boolean,
      required: false,
    },

    email_verified_at: {
      type: Date,
    },

    stripe_customer_id: {
      type: String,
      required: false,
    },

    is_subscribed_to_newsletter: {
      type: Boolean,
      required: false,
    },
    account_type: {
      enum: ["premium", "basic", "standard"],
      type: String,
      required: false,
    },

    stripe_host_id: {
      type: String,
      required: false,
    },

    provider: {
      type: String,
      enum: ["local", "google", "facebook", "apple"],

      default: "local",
    },
    role: {
      type: [{
        type: String,
        enum: Object.values(EUserRole),
      }],
      default: ['guest'],
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: [String],
    password_reset_otp: {
      type: String,
    },
    password_reset_expires: {
      type: Date
    },
    reset_password_token: {
      type: String,
    },
    verify_otp: {
      type: String,
    },
    otp_verify_expires: {
      type: Date,
    },
    password_changedAt: { type: Date },
  },
  {
    virtuals: {
      complete_percentage: {
        get() {
          return getUserCompleteInPercentage(this)
        },
      },
      profile_status: {
        get() {
          const { percentage } = getUserCompleteInPercentage(this);
          const { driving_license_verified, airmen_verified } = this
          if (percentage < 100) return "incomplete";
          if (percentage === 100 && (!driving_license_verified || !airmen_verified)) return "in-review";
          return "complete";
        },
      },
    },
    timestamps: true,

    toJSON: {
      versionKey: false,
      virtuals: true,
      transform(_, ret, __) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.refreshToken;
        delete ret.password_changedAt;
        delete ret.otp_verify_expires;
        delete ret.verify_otp;
        delete ret.password_reset_expires;
        delete ret.password_reset_otp;
        delete ret.verification_string
        return ret;
      },
    },
    toObject: { virtuals: true },
  },
)
  .pre("save", hashPasswordBeforeSave)
  .pre("findOneAndUpdate", hashPasswordBeforeUpdate)
  .method("createPasswordReset", createPasswordReset)
  .method("comparePassword", comparePassword)
  .method("changePasswordAfter", changePasswordAfter)
