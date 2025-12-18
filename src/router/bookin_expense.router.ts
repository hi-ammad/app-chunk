import { Router } from "express";
import {
  createBookingExpense,
  deleteBookingExpense,
  getAllBookingExpenses,
  getSingleBookingExpense,
  updateBookingExpense,
} from "@/service/booking_expense.service";
import { routeWdVersion } from '@/library/utils';

const router = Router();

router.route(routeWdVersion("stay/booking-expense")).post(createBookingExpense).get(getAllBookingExpenses);
router
  .route(routeWdVersion("stay/booking-expense/:id"))
  .get(getSingleBookingExpense)
  .patch(
    updateBookingExpense,
  )
  .delete(
    deleteBookingExpense,
  );

export default router;
