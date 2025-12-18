/**
*  Stay interface representing a lodging or accommodation listing.
*  It includes various properties such as address, host information,
*  number of guests, pricing details, rules, and location.
*  @interface Stay
*  @extends {ITimeStamp}
*  @property {Types.ObjectId} id - Unique identifier for the stay.
*  @property {Types.ObjectId} user - Reference to the user who created the stay.
*  @property {string} rental_type - Type of rental (e.g., "Short-term rental", "Long-term rental").
*  @property {Array} bedrooms - Array of bedroom objects, each containing details like name, number of guests, number of beds, and bed type.
*  @property {Array} calendar - Array of calendar objects, each containing start and end dates and a type (0 for blocked, 1 for available).
*  @property {Array} extra_services - Array of extra service objects, each containing price, quantity, name, description, and service type.
*  @property {Array}  features - Array of strings representing features of the stay (e.g., "WiFi", "Air conditioning").
*  @property {Array}  images - Array of image objects, each containing image URL, sort order, description, and active status.
*  @property {string} place_type - Type of place (e.g., "Apartment", "House").
*  @property {Array}  services - Array of strings representing services available at the stay.
*  @property {string} space_type - Type of space (e.g., "Entire place", "Private room").
*  @property {string} surface_type - Type of surface (e.g., "Loft", "Villa").
*  @property {string} stay_type - Type of stay (e.g., "Vacation rental", "Business accommodation").
*  @property {Array}  airports - Array of airport objects, each containing details like identifier, name, helicopter allowed status, and various attributes related to the airport.
*  @property {Object} address - Address object containing country, state, city, zipcode, area, address, apartment, and location details.
*  @property {Object} pricing - Pricing object containing nightly price, cleaning fee, city fee, tax percentage, weekend pricing, and additional guest information.
*  @property {Array}  custom_pricing - Array of custom pricing objects, each containing start and end dates, nightly price, weekend price, additional guest price, and additional guest allowance.
*  @property {number} no_of_guest - Total number of guests allowed at the stay.
*  @property {number} no_of_bedrooms - Total number of bedrooms in the stay.
*  @property {number} no_of_beds - Total number of beds in the stay.
*  @property {number} no_of_bathrooms - Total number of bathrooms in the stay.
*  @property {number} no_of_rooms - Optional total number of rooms in the stay.
*  @property {number} size - Optional size of the stay in square meters.
*  @property {string} unit_of_measure - Optional unit of measure for the size (e.g., "sqm").
*  @property {string} description - Optional description of the stay.
*  @property {boolean} instant_booking - Indicates if the stay allows instant booking.
*  @property {string} rules - General rules for the stay.
*/
interface IStay extends ITimeStamp {
  id: Types.ObjectId; // Unique identifier for the stay
  user: Types.ObjectId
  rental_type: String // e.g., "Short-term rental", "Long-term rental" 
  bedrooms: [{
    name: string;
    no_of_guest: number;
    no_of_beds: number;
    bed_type: number; // 0: Single, 1: Double, 2: Queen, 3: King
  }]
  calendar: [{
    start_date: Date;
    end_date: Date;
    type: number; // 0 for blocked, 1 for available
  }]
  extra_services: [{
    price: number;
    quantity: number;
    name: string;
    description: string;
    service_type: string;
  }]
  features: [string] // e.g., "WiFi", "Air conditioning", etc. 
  images: [{
    image: string; // URL or path to the image file
    sort_order: number; // Order in which the image should be displayed
    description?: string; // Optional description of the image
    is_active?: boolean; // Indicates if the image is active or not
  }]
  calendar: [IStayCalendar]
  is_draft: boolean; // Indicates if the stay is a draft
  place_type: string // e.g., "Apartment", "House", etc.
  services: [string]
  space_type: string // e.g., "Entire place", "Private room", etc.
  surface_type: string // e.g., "Loft", "Villa", etc.
  stay_type: string
  airports: [
    {
      identifier: string;
      name: string;
      helicopter_allowed: boolean;
      stay: Types.ObjectId; // Reference to the stay object
      use: number; // 0: Public Use, 1: Private Use
      ctaf_unicom?: string;
      dimension_feets?: string;
      dimension_meters?: string;
      elevation_feets?: number;
      elevation_meters?: number;
      fuel?: string;
      lighting?: boolean;
      operation_hours?: string;
      orientation?: string;
      runway_condition?: string;
      parking?: string;
      pattern?: string;
      surface?: string;
      air_nav?: string; // URI
      ground_transportation?: string;
      distance_from_runway?: number; // Precision to two decimal places
      additional_info?: string;
    }]
  address: {
    country: string; // e.g., "United States"
    state: string; // e.g., "California"
    city: string; // e.g., "Los Angeles"
    zipcode: number; // e.g., 90001
    area?: string; // e.g., "Downtown"
    address: string; // e.g., "123 Main St"
    apartment?: string; // e.g., "Apt 4B"
    location?: {
      type: 'Point'; // type of location, must be 'Point'
      coordinates: [number, number]; // coordinates in [longitude, latitude] format
    };
    fake_location?: {
      type: 'Point'; // type of location, must be 'Point'
      coordinates: [number, number]; // coordinates in [longitude, latitude] format
    };

  }
  pricing: {
    nightly_price?: number; // in currency units
    cleaning_fee?: number; // in currency units
    city_fee?: number; // in currency units
    tax_percentage?: number; // percentage value
    apply_weekend_price?: string; // e.g., "Saturday & Sunday"
    weekend_nightly_price?: number; // in currency units
    nightly_price_seven_plus?: number; // in currency units
    nightly_price_thirty_plus?: number; // in currency units
    additional_guest?: boolean; // indicates if additional guests are allowed

  }
  custom_pricing: [{
    start_date?: Date; // start date for custom pricing
    end_date?: Date; // end date for custom pricing
    nightly_price?: number; // in currency units
    weekend_nightly_price?: number; // in currency units
    price_additional_guest?: number; // in currency units
    additional_guest?: boolean; // indicates if additional guests are allowed
  }]
  calendar: [{
    start_date: Date; // start date for the calendar entry
    end_date: Date; // end date for the calendar entry
    type: number; // 0 for blocked, 1 for available
  }]
  bedrooms: [{
    name: string;
    no_of_guest: number;
    no_of_beds: number;
    bed_type: number; // 0: Single, 1: Double, 2: Queen, 3: King
  }]
  extra_services: [{
    price: number; // price of the extra service in currency units
    quantity: number; // quantity of the extra service
    name: string; // name of the extra service
    description: string; // description of the extra service
    service_type: string; // type of the service (e.g., "Cleaning", "Laundry")

  }]
  no_of_guest: number;
  no_of_bedrooms: number;
  no_of_beds: number;
  no_of_bathrooms: number;
  no_of_rooms?: number;
  size?: number; // in sqm
  unit_of_measure?: string; // e.g., sqm
  description?: string;
  instant_booking?: boolean;
  rules?: string; // general rules for the stay
  created_at: string; // ISO date format
  updated_at: string; // ISO date format
  no_of_pets?: number; // maximum pets allowed
  price_per_pet?: number; // price per pet in currency units
  welcome_message?: string; // welcome message for guests
  stay_title?: string; // title of the stay
}
