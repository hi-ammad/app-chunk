import { BookingTransaction } from "@/modal";
import { createBookingTransactionJoi, updateBookingTransactionJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createBookingTransaction = handleFactory.createOne(BookingTransaction, createBookingTransactionJoi);

export const getSingleBookingTransaction = handleFactory.getOne(BookingTransaction);

export const getAllBookingTransactions = handleFactory.getAll(BookingTransaction);

export const updateBookingTransaction = handleFactory.updateOne(BookingTransaction, updateBookingTransactionJoi);

export const deleteBookingTransaction = handleFactory.deleteOne(BookingTransaction);
