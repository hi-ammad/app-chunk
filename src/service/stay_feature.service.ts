import { StayFeature } from "@/modal";
import { createStayFeatureJoi, updateStayFeatureJoi } from "@/validation";
import handleFactory from "./handle.service";
import catchAsync from "@/library/catch_async";

export const createStayFeature = handleFactory.createOne(StayFeature, createStayFeatureJoi, true);

export const getSingleStayFeature = handleFactory.getOne(StayFeature);

export const getAllStayFeatures = handleFactory.getAll(StayFeature);

export const updateStayFeature = handleFactory.updateOne(StayFeature, updateStayFeatureJoi);

export const deleteStayFeature = handleFactory.deleteOne(StayFeature);

export const getAllFeatureAndSubFeatures = catchAsync(async (req, res, next) => {
  const features = await StayFeature.find()
    .populate('parent');

  const featuresWithSubFeatures = []
  const parentFeatures = features.filter(feature => !feature.parent);
  const subFeatures = features.filter(feature => feature.parent);
  for (const parentFeature of parentFeatures) {
    const subFeaturesForParent = subFeatures.filter(subFeature => subFeature.parent?._id.toString() === parentFeature._id.toString());
    featuresWithSubFeatures.push({
      ...parentFeature.toObject(),
      sub_features: subFeaturesForParent
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      features: featuresWithSubFeatures
    }
  });
});

