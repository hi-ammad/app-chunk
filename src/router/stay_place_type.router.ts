import { Router } from "express";
import {
  createStayPlaceType,
  deleteStayPlaceType,
  getAllStayPlaceTypes,
  getSingleStayPlaceType,
  updateStayPlaceType,
} from "@/service/stay_place_type.service";
import { routeWdVersion } from '@/library/utils';

const router = Router();

router
  .route(routeWdVersion("stay/place-type"))
  .post(createStayPlaceType)
  .get(getAllStayPlaceTypes);

router
  .route(routeWdVersion("stay/place-type/:id"))
  .get(getSingleStayPlaceType)
  .patch(
    updateStayPlaceType,
  )
  .delete(
    deleteStayPlaceType,
  );

export default router;
