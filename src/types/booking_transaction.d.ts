
/**
 * Booking Transaction Type Definitions
 * This file defines the structure for booking transactions in the system.
 * It includes user details, payment information, transaction status, and purpose.
 * @interface IBookingTransaction
 * @property {number} user - The ID of the user associated with the transaction.
 * @property {string} payment_method_id - The ID of the payment method used.
 * @property {string} payment_intent_id - The ID of the payment intent for the transaction.
 * @property {"card" | "bank_transfer" | "cash"} payment_method_type - The type of payment method used.
 * @property {string} transaction_reference - A unique reference for the transaction.
 * @property {number} amount - The amount involved in the transaction.
 * @property {number} [taxes] - Optional taxes applied to the transaction.
 * @property {0 | 1} type - The type of transaction: 0 for CREDIT, 1 for DEBIT.
 * @property {0 | 1 | 2} status - The status of the transaction: 0 for PENDING, 1 for SUCCESS, 2 for DECLINED.
 * @property {0 | 1} purpose - The purpose of the transaction: 0 for BOOKING, 1 for REFUND.
 * @property {string} [meta_data] - Optional metadata associated with the transaction.
 * */
interface IBookingTransaction {
  user: Types.ObjectId; // MongoDB ObjectId
  payment_method_id: string;
  payment_intent_id: string;
  payment_method_type: "card" | "bank_transfer" | "cash";
  transaction_reference: string;
  amount: number;
  taxes?: number;
  type: 0 | 1; // 0: CREDIT, 1: DEBIT
  status: 0 | 1 | 2; // 0: PENDING, 1: SUCCESS, 2: DECLINED
  purpose: 0 | 1; // 0: BOOKING, 1: REFUND
  meta_data?: string;
}

