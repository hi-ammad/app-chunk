
/**
 * Review interface for a stay in a hotel .
 * @interface IReview
 * @extends {ITimeStamp}
 * @property {number} rating - The rating given by the user, typically between 0 and 5.
 * @property {string} [comment] - Optional comment provided by the user about their stay.
 * @property {Types.ObjectId} user - The ID of the user who made the review.
 * @property {Types.ObjectId} stay - The ID of the stay that is being reviewed.
 * @property {boolean} is_active - Indicates whether the review is active or not.
 */
interface IReview extends ITimeStamp {
  rating: number;
  comment?: string;
  guest: Types.ObjectId;
  host: Types.ObjectId;
  stay?: Types.ObjectId;
  business?: Types.ObjectId;
  type: 0 | 1 | 2 | 3; // 0: guest-to-stay, 1: guest-to-business, 2: guest-to-host, 3: host-to-guest
  is_active: boolean;
}

