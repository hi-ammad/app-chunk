import { Router } from "express";
import {
  createStaySpaceType,
  deleteStaySpaceType,
  getAllStaySpaceTypes,
  getSingleStaySpaceType,
  updateStaySpaceType,
} from "@/service/stay_space_type.service";
import { routeWdVersion } from '@/library/utils';

const router = Router();

router
  .route(routeWdVersion("stay/space-type"))
  .post(createStaySpaceType)
  .get(getAllStaySpaceTypes);

router
  .route(routeWdVersion("stay/space-type/:id"))
  .get(getSingleStaySpaceType)
  .patch(
    updateStaySpaceType,
  )
  .delete(
    deleteStaySpaceType,
  );

export default router;
