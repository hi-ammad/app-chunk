/**
 * StayImage interface definition
 * It includes properties for the image's unique identifier, URL, sort order, description, associated stay, and active status.
 * It also extends a timestamp interface to include created and updated timestamps.
 * @interface StayImage
 * @extends ITimeStamp
 * @property {Types.ObjectId} id - Unique identifier for the image
 * @property {string} image - URL or path to the image file
 * @property {number} sort_order - Order in which the image should be displayed
 * @property {string} [description] - Optional description of the image
 * @property {Types.ObjectId} stay - Identifier for the associated stay
 * @property {boolean} [is_active] - Indicates if the image is active or not
 */
interface IStayImage extends ITimeStamp {
  id: Types.ObjectId; // Unique identifier for the image
  image: string; // URL or path to the image file
  sort_order: number; // Order in which the image should be displayed
  description?: string; // Optional description of the image
  stay: Types.ObjectId; // Identifier for the associated stay
  is_active?: boolean; // Indicates if the image is active or not
}
