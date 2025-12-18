/** 
 * Booking interface representing a reservation made by a user for a stay.
 * It includes details such as user ID, stay ID, dates, number of guests, and payment information.
 *  @interface IBooking
 *  @property {Types.ObjectId} user - The ID of the user making the booking.
 *  @property {Types.ObjectId} stay - The ID of the stay being booked.
 *  @property {Date} arrival_date - The date of arrival for the booking.
 *  @property {Date} departure_date - The date of departure for the booking.
 *  @property {number} no_of_guests - The number of guests included in the booking.
 *  @property {string} [note] - An optional note or message related to the booking.
 *  @property {number} [status] - The status of the booking (0: Pending, 1: Completed, 2: Cancelled).
 *  @property {number} [transaction_id] - The transaction ID associated with the booking.
 *  @property {number} [invoice_id] - The invoice ID associated with the booking.
 *  @property {number} [no_of_infants] - The number of infants included in the booking.
 *  @property {number} [no_of_pets] - The number of pets included in the booking.
 *  @property {number} [no_of_childrens] - The number of children included in the booking.
 *  @property {number} amount - The total amount for the booking.
 *  @property {number} [taxes] - The taxes applied to the booking.
 *  @property {string} [meta_data] - Additional metadata related to the booking.
 *  @extends {ITimeStamp} - Inherits timestamp properties for created and updated dates.
 */
interface IBooking extends ITimeStamp {
  user: Types.ObjectId; // User ID
  stay: Types.ObjectId; // Stay ID
  arrival_date: Date; // Arrival date
  departure_date: Date; // Departure date
  no_of_guests: number; // Number of guests
  note?: string; // Optional note
  status?: number; // Booking status (0: Pending, 1: Completed, 2: Cancelled)
  transaction_id?: number; // Transaction ID
  invoice_id?: number; // Invoice ID
  no_of_infants?: number; // Number of infants
  no_of_pets?: number; // Number of pets
  no_of_childrens?: number; // Number of children
  amount: number; // Total amount for the booking
  taxes?: number; // Taxes applied to the booking
  meta_data?: string; // Additional metadata related to the booking
  extra_services_total: number;
}
