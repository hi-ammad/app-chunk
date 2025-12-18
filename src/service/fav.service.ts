import { Favourite } from "@/modal";
import { createFavStayJoi } from "@/validation";
import handleFactory from "./handle.service";
import catchAsync from "@/library/catch_async";

export const createFavourite = handleFactory.createOne(Favourite, createFavStayJoi, true);

export const getSingleFavourite = handleFactory.getOne(Favourite);

export const getAllFavourites = handleFactory.getAll(Favourite);

// export const updateFavourite = handleFactory.updateOne(Favourite,createFavStayJoi);

export const deleteFavourite = handleFactory.deleteOne(Favourite);

export const toggleFav = catchAsync(async (req, res, next) => {
  const { stay } = req.params;
  const user = req.user.id;

  // Check if the stay is already favourited
  const existingFav = await Favourite.findOne({ stay, user });

  if (existingFav) {
    // If it exists, delete it
    await Favourite.findByIdAndDelete(existingFav._id);
    return res.status(204).json({});
  } else {
    // If it doesn't exist, create a new favourite
    const doc = await Favourite.create({ stay, user });
    res.status(201).json({
      status: "success",
      data: {
        doc,
      },
    });
  }

});
