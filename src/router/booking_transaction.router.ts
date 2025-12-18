import { Router } from "express";
import {
  createBookingTransaction,
  deleteBookingTransaction,
  getAllBookingTransactions,
  getSingleBookingTransaction,
  updateBookingTransaction,
} from "@/service/booking_transaction.service";
import { routeWdVersion } from '@/library/utils';
import { multerUpload } from "@/library/multer.ts";
import multerToBody from "@/middleware/multer.to.body.ts";

const router = Router();

router
  .route(routeWdVersion("stay/booking-transaction"))
  .post(multerUpload.single('icon'), multerToBody, createBookingTransaction)
  .get(getAllBookingTransactions);

router
  .route(routeWdVersion("stay/booking-transaction/:id"))
  .get(getSingleBookingTransaction)
  .patch(
    updateBookingTransaction,
  )
  .delete(
    deleteBookingTransaction,
  );

export default router;
