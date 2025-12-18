/**
 * Testimonial interface
 * It includes properties for the testimonial's author, content, and metadata.
 * @interface ITestimonial
 * @extends {ITimeStamp}
 * @property {string} name - The name of the person giving the testimonial.
 * @property {string} [photo] - Optional URL to the photo of the person.
 * @property {string} [occupation] - Optional occupation of the person.
 * @property {string} testimonial - The content of the testimonial.
 * @property {Types.ObjectId} [user] - Optional reference to the user who provided the testimonial.
 * @property {boolean} [is_active] - Optional flag indicating if the testimonial is active.
 */
interface ITestimonial extends ITimeStamp {
  name: string;
  photo?: string;
  occupation?: string;
  testimonial: string;
  user?: Types.ObjectId; // User ID
  is_active?: boolean;
}
