import { BookingExpense } from "@/modal";
import { createBookingExpenseJoi, updateBookingExpenseJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createBookingExpense = handleFactory.createOne(BookingExpense, createBookingExpenseJoi, true);

export const getSingleBookingExpense = handleFactory.getOne(BookingExpense);

export const getAllBookingExpenses = handleFactory.getAll(BookingExpense);

export const updateBookingExpense = handleFactory.updateOne(BookingExpense, updateBookingExpenseJoi);

export const deleteBookingExpense = handleFactory.deleteOne(BookingExpense);
