import { Router } from "express";
import {
  createStayExtraService,
  deleteStayExtraService,
  getAllStayExtraServices,
  getSingleStayExtraService,
  updateStayExtraService,
} from "@/service/stay_extra_service.service";
import { routeWdVersion } from '@/library/utils';

const router = Router();

router
  .route(routeWdVersion("stay/extra-service"))
  .post(createStayExtraService)
  .get(getAllStayExtraServices);

router
  .route(routeWdVersion("stay/extra-service/:id"))
  .get(getSingleStayExtraService)
  .patch(
    updateStayExtraService,
  )
  .delete(
    deleteStayExtraService,
  );

export default router;
