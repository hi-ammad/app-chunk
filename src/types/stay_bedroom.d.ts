/**
 * StayBedroom interface
 * This interface defines the structure of a bedroom in a stay.
 * @interface StayBedroom
 * @property {number} id - Unique identifier for the bedroom.
 * @property {string} name - Name of the bedroom.
 * @property {number} no_of_guest - Number of guests that can stay in the bedroom.
 * @property {number} no_of_bed - Number of beds in the bedroom.
 * @property {number} bed_type - Type of bed in the bedroom (0: Single, 1: Double, 2: Queen, 3: King).
 * @property {Types.ObjectId} user - ID of the user who created the bedroom.
 * @property {Types.ObjectId} stay - ID of the stay this bedroom belongs to.
 * @extends ITimeStamp
 */
interface IStayBedroom extends ITimeStamp {
  id: number;
  name: string;
  no_of_guest: number;
  no_of_beds: number;
  bed_type: number; // 0: Single, 1: Double, 2: Queen, 3: King
}
