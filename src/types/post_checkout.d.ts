/**
 * PostCheckout interface represents a post checkout charge in the system.
 * It extends the ITimeStamp interface to include created and updated timestamps.
 *  @interface PostCheckout
 *  @property {Types.ObjectId} id - Unique identifier for the post checkout charge.
 *  @property {string[]} images - Array of image URLs related to the post checkout charge.
 *  @property {string} reason - Reason for the post checkout charge.
 *  @property {number} amount - Amount charged in the post checkout.
 *  @property {string} situation_description - Description of the situation leading to the charge.
 *  @property {number} booking - ID of the booking associated with this charge.
 *  @property {Types.ObjectId} host - ID of the user who created this post checkout charge.
 *  @property {number} status - Status of the post checkout charge (0 - pending, 1 - approved, 2 - rejected).
 *  @extends ITimeStamp
 */
interface IPostCheckout extends ITimeStamp {
  id: Types.ObjectId; // Unique identifier for the post checkout charge
  images: string[]; // Array of image URLs related to the post checkout charge
  reason: string; // Reason for the post checkout charge
  amount: number; // Amount charged in the post checkout
  situation_description: string; // Description of the situation leading to the charge
  user: Types.ObjectId; // ID of the user who created this post checkout charge
  booking: Types.ObjectId; // ID of the booking 
  status: number  // 0 - pending, 1 - approved, 2 - rejected 
}
