/**
 * IBusiness interface represents a business entity with various attributes.
 * It extends the ITimeStamp interface to include created and updated timestamps.
 * @interface IBusiness
 * @property {Types.ObjectId} id - Unique identifier for the business
 * @property {Types.ObjectId} user - Reference to the user who owns the business
 * @property {string} name - Name of the business
 * @property {string} [type] - Type of business (optional)
 * @property {string} [country] - Country where the business is located (optional)
 * @property {string} [state] - State where the business is located (optional)
 * @property {string} [city] - City where the business is located (optional)
 * @property {string} [zipcode] - Zip code of the business location (optional)
 * @property {string} [address] - Address of the business (optional)
 * @property {number} [unit_no] - Unit number of the business (optional)
 * @property {string} [area] - Area where the business is located (optional)
 * @property {string} [airport] - Nearest airport to the business (optional)
 */
interface IBusiness extends ITimeStamp {
  id: Types.ObjectId; // Unique identifier for the business
  user: Types.ObjectId; // Reference to the user who owns the business
  name: string;
  phone: string;
  description: string;
  operation_hours: {};
  tagline: string;
  business_type?: string;
  country?: string;
  state?: string;
  city?: string;
  zipcode?: string;
  address?: {};
  unit_no?: number;
  area?: string;
  images: {}
  airport?: string;
  distance_from_runway?: number; // in meters
  latitude?: number; // in decimal degrees
  longitude?: number; // in decimal degrees
  url?: string; // website URL
  isPaid?: boolean; // indicates if the business is paid or not
  logo?: string; // path to the business logo image
}
