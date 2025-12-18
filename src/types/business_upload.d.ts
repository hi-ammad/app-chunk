/**
 * Business Upload Type Definitions
 * It includes the necessary fields and their types, ensuring consistency across the application.
 * @interface BusinessUpload
 * @property {Types.ObjectId} id - Unique identifier for the upload
 * @property {string} image - Path to the uploaded image
 * @property {Types.ObjectId} business - ID of the associated business
 * @property {0 | 1 | 2} type - Type of upload (0: menu, 1: gallery, 2: other)
 */
interface IBusinessUpload extends ITimeStamp {
  id: Types.ObjectId; // Unique identifier for the upload
  image: string; // Path to the uploaded image
  business: Types.ObjectId; // ID of the associated business
  type: 0 | 1 | 2; // Type of upload - 0: menu, 1: gallery, 2: other
  is_featured?: boolean; // Indicates if the upload is featured
}
