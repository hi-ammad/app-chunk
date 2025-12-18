/**
 * Cancellation Policy Interface
 * @interface ICancellationPolicy
 * @property {number} id - Unique identifier for the cancellation policy
 * @property {string} name - Name of the cancellation policy
 * @property {0 | 1 | 2} type - Type of cancellation policy (0: short, 1: medium, 2: long)
 * @property {Date} before_check_in - Time before check-in when cancellation is allowed
 * @property {Date} after_check_in - Time after check-in when cancellation is allowed
 * @property {Types.ObjectId} user - User ID associated with the cancellation policy
 * @extends {ITimeStamp}
 */
interface ICancellationPolicy extends ITimeStamp {
  id: number;
  name: string;
  type: 0 | 1 | 2; // 0: short, 1: medium, 2: long
  before_check_in: string;
  after_check_in: string;
  user: Types.ObjectId;
}
