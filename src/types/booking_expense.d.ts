/**
 * Represents a user object with various properties.
 * @interface IBookingExpense
 * @property {Types.ObjectId} _id - Unique identifier for the booking expense.
 * @property {Types.ObjectId} stay - Reference to the associated stay.
 * @property {Types.ObjectId} user - Reference to the user who created the expense.
 * @property {string} name - Name of the expense.
 * @property {number} guest - Number of guests associated with the expense.
 * @property {number} bed - Number of beds associated with the expense.
 * @property {number} bed_type - Type of bed associated with the expense.
 * @extends ITimeStamp - Timestamp properties for created and updated times.
 */
interface IBookingExpense extends ITimeStamp {
  id: Types.ObjectId;
  stay: Types.ObjectId;
  user: Types.ObjectId;
  name: string;
  guests: number;
  bed: number;
  bed_type: number;
}
