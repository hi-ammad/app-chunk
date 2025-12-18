import { Router } from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getSingleBooking,
  getBookingAmount,
  updateBooking,
} from "@/service/booking.service.ts";
import { routeWdVersion } from '@/library/utils';

const router = Router();

router
  .route(routeWdVersion("stay/booking/quote"))
  .post(getBookingAmount);

router
  .route(routeWdVersion("stay/booking"))
  .post(createBooking)
  .get(getAllBookings);

router
  .route(routeWdVersion("stay/booking/:id"))
  .get(getSingleBooking)
  .patch(
    updateBooking,
  )
  .delete(
    deleteBooking,
  );

export default router;
