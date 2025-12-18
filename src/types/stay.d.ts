//
// /**
// *  Stay interface representing a lodging or accommodation listing.
// *  It includes various properties such as address, host information,
// *  number of guests, pricing details, rules, and location.
// *  @interface Stay
// */
// interface IStay extends ITimeStamp {
//   id: number;
//   host: Types.ObjectId;
//   address: string;
//   unit_no?: number;
//   country: Types.ObjectId; // reference to a country object
//   state: string;
//   city: string;
//   zipcode: number;
//   area?: string;
//   type_of_space: Types.ObjectId; // reference to a type of space object
//   lodging_type: Types.ObjectId; // reference to a lodging type object
//   no_of_guest: number;
//   no_of_bedrooms: number;
//   no_of_beds: number;
//   no_of_bathrooms: number;
//   no_of_rooms?: number;
//   size?: number; // in sqm
//   unit_of_measure?: string; // e.g., sqm
//   description?: string;
//   instant_booking?: boolean;
//   nightly_price?: number; // in currency units
//   apply_weekend_price?: string; // e.g., "Saturday & Sunday"
//   weekend_nightly_price?: number; // in currency units
//   nightly_price_seven_plus?: number; // in currency units
//   nightly_price_thirty_plus?: number; // in currency units
//   additional_guest?: boolean;
//   no_of_additional_guest?: number;
//   additional_guest_price?: number; // in currency units
//   pet_allowed?: boolean;
//   cleaning_fee?: number; // in currency units
//   city_fee?: number; // in currency units
//   tax_percentage?: number; // percentage value
//   cancellation_policy_short?: number; // e.g., policy ID or code
//   min_day_booking?: number; // minimum days for booking
//   max_day_booking?: number; // maximum days for booking
//   check_in_after?: string; // e.g., "04:28:49"
//   check_out_before?: string; // e.g., "00:28:49"
//   smoking_allowed?: boolean;
//   party_allowed?: boolean;
//   children_allowed?: boolean;
//   rules?: string; // general rules for the stay
//   is_disable?: boolean; // indicates if the stay is disabled or not
//   status: 0 | 1; // status of the stay listing - 0 for inactive, 1 for active
//   is_featured?: boolean; // indicates if the stay is featured or not
//   created_at: string; // ISO date format
//   updated_at: string; // ISO date format
//   no_of_pets?: number; // maximum pets allowed
//   price_per_pet?: number; // price per pet in currency units
//   cancellation_policy_long?: number; // detailed cancellation policy ID or code
//   smoking_rules?: string; // specific rules regarding smoking
//   pet_rules?: string; // specific rules regarding pets
//   party_rules?: string; // specific rules regarding parties
//   children_rules?: string; // specific rules regarding children
//   infant_start_age?: number; // age from which infants are considered
//   child_start_age?: number; // age from which children are considered
//   welcome_message?: string; // welcome message for guests
//   priority?: number; // priority level for the stay
//   timezone?: string; // e.g., "America/Inuvik"
//   helicopter_allowed?: boolean; // indicates if helicopter access is allowed
//   location?: {
//     type: 'Point'; // type of location, must be 'Point'
//     coordinates: [number, number]; // coordinates in [longitude, latitude] format
//   };
//   fake_location?: {
//     type: 'Point'; // type of location, must be 'Point'
//     coordinates: [number, number]; // coordinates in [longitude, latitude] format
//   };
//   stay_title?: string; // title of the stay
//   child_max_age?: number; // maximum age for children
//   city_fee_frequency?: string; // frequency of city fee (e.g., "Daily")
//   cleaning_frequency?: string; // frequency of cleaning (e.g., "Daily")
//   stay_type?: Types.ObjectId; // reference to a stay type object 
//   infant_max_age?: number; // maximum age for infants
// }
//
