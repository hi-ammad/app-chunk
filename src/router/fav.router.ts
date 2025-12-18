
import { Router } from "express";
import {
  createFavourite,
  deleteFavourite,
  getAllFavourites,
  getSingleFavourite,
  toggleFav,
} from "../service/fav.service.ts";
import { routeWdVersion } from '@/library/utils';
const router = Router();

router
  .route(routeWdVersion("user/favourite"))
  .post(createFavourite)
  .get(getAllFavourites);

router
  .route(routeWdVersion("user/favourite/:id"))
  .get(getSingleFavourite)
  .delete(
    deleteFavourite,
  );

router.post(routeWdVersion("user/favourite/toggle/:stay"), toggleFav);

export default router;
