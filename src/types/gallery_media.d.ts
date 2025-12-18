/**
 * GalleryImage interface definition
 * @interface GalleryImage
 * @extends ITimeStamp
 * @property {Types.ObjectId} id - Unique identifier for the image
 * @property {string} image - URL or path to the image file
 * @property {number} sort_order - Order in which the image should be displayed
 * @property {string} [description] - Optional description of the image
 * @property {Types.ObjectId} user - user who uploaded the media 
 * @property {boolean} [is_active] - Indicates if the image is active or not
 */
interface IGalleryMedia extends ITimeStamp {
  id: Types.ObjectId; // Unique identifier for the image
  image: string; // URL or path to the image file
  sort_order: number; // Order in which the image should be displayed
  description?: string; // Optional description of the image
  user: Types.ObjectId; // User/admin who uploaded the media 
  is_active?: boolean; // Indicates if the image is active or not
}
