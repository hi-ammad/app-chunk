/**
 * Stay Extra Service Interface
 * It includes properties for the service's ID, price, quantity, associated service type, and the stay it belongs to.
 * It also extends a timestamp interface to include created and updated timestamps.
 * @interface IStayCalendar
 * @property {Types.ObjectId} id - Unique identifier for the stay calendar entry.
 * @property {Date} start_date - Start date of the stay.
 * @property {Date} end_date - End date of the stay.
 * @property {number} type - Type of the calendar entry (0 for blocked, 1 for available).
 * @property {Types.ObjectId} stay - Reference to the stay associated with the calendar entry.
 * @property {Types.ObjectId} user - Reference to the user who created the calendar entry.
 * @extends ITimeStamp
 */
interface IStayCalendar extends ITimeStamp {
  id: Types.ObjectId;
  block_dates: [
    {
      start_date: Date;
      end_date: Date;
    }
  ],
  provider: string; // Name of the calendar entry 
  type: number; // 0 for blocked, 1 for available
  stay: Types.ObjectId; // Reference to the stay
  user: Types.ObjectId; // Reference to the user who created the calendar entry
}
