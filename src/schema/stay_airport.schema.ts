import { EModalNames } from "@/enum";
import { Schema } from "mongoose";

export default new Schema<IAirport>({
  airport_identifier: {
    type: String,
    required: true,
  },
  stay: {
    type: Schema.Types.ObjectId,
    ref: EModalNames.STAY, // Assuming 'Stay' is the model name for the stay object
    required: true,
  },
  airport_name: {
    type: String,
    required: true,
  },
  airport_use: {
    type: Number,
    required: true, // 0: Public_Use, 1: Private_Use
  },
  ctaf_unicom: {
    type: String,
    default: null,
  },
  dimension_feets: {
    type: String,
    default: null,
  },
  dimension_meters: {
    type: String,
    default: null,
  },
  elevation_feets: {
    type: Number,
    default: null,
  },
  elevation_meters: {
    type: Number,
    default: null,
  },
  fuel: {
    type: String,
    default: null,
  },
  lighting: {
    type: Boolean,
    default: false,
  },
  operation_hours: {
    type: String,
    default: null,
  },
  orientation: {
    type: String,
    default: null,
  },
  runway_condition: {
    type: String,
    default: null,
  },
  parking: {
    type: String,
    default: null,
  },
  pattern: {
    type: String,
    default: null,
  },
  surface: {
    type: String,
    default: null,
  },
  air_nav: {
    type: String, // URI
    default: null,
  },
  ground_transportation: {
    type: String,
    default: null
  },
  distance_from_runway: {
    type: Number,
    precision: 2,
    default: null
  },
  additional_info: {
    type: String,
    default: null
  }
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
