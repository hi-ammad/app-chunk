import { Router } from "express";
import {
  createStayCalendar,
  deleteStayCalendar,
  getAllStayCalendars,
  getSingleStayCalendar,
  updateStayCalendar,
} from "@/service/stay_calendar.service";
import { routeWdVersion } from '@/library/utils';

const router = Router();

router
  .route(routeWdVersion("stay/calendar"))
  .post(createStayCalendar)
  .get(getAllStayCalendars);

router
  .route(routeWdVersion("stay/calendar/:id"))
  .get(getSingleStayCalendar)
  .patch(
    updateStayCalendar,
  )
  .delete(
    deleteStayCalendar,
  );

export default router;
