import { Router } from "express";
import {
  createStayService,
  deleteStayService,
  getAllStayServices,
  getSingleStayService,
  updateStayService,
} from "@/service/stay_service.service.ts";
import { routeWdVersion } from '@/library/utils';

const router = Router();

router.route(routeWdVersion("stay/service-type")).post(createStayService).get(getAllStayServices);
router
  .route(routeWdVersion("stay/service-type/:id"))
  .get(getSingleStayService)
  .patch(
    updateStayService,
  )
  .delete(
    deleteStayService,
  );

export default router;
