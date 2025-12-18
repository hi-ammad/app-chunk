/**
 *  Enum representing different modal names used in the application.
 *  This enum is used to manage modal states and names consistently across the application.
 *  @enum EModalNames
 *  @property {string} USER - Represents the user modal.
 *  @property {string} STAY - Represents the stay modal.
 *  @example
 *  const modalName = EModalNames.USER; // "User"
 */
export enum EModalNames {
  USER = "User",
  BUSINESS = "Business",
  STAY = "Stay",
  STAY_TYPE = "Stay-Type",
  STAY_AIRPORT = "Stay-Airport",
  STAY_CALENDAR = "Stay-Calendar",
  STAY_SPACE_TYPE = "Stay-Space-Type",
  BUSINESS_PAYMENT = "Business-Payment",
  BUSINESS_TYPE = "Business-Type",
  BUSINESS_UPLOAD = "Business-Upload",
  CANCELLATION_POLICY = "Cancellation-Policy",
  COUNTRY = "Country",
  GALLERY_MEDIA = "Gallery-Media",
  REVIEW = "Review",
  SQUAWK = "Squawk",
  SQUAWK_CATEGORY = "Squawk-Category",
  SQUAWK_COMMENT = "Squawk-Comment",
  SQUAWK_TAG = "Squawk-Tag",
  BOOKING_EXPENSE = "Booking-Expense",
  BOOKING = "Booking",
  POST_CHECKOUT = "Post-Checkout",
  BOOKING_TRANSACTION = "Booking-Transaction",
  SERVICE_TYPE = "Service-Type",
  STAY_EXTRA_SERVICE = "Stay-Extra-Service",
  FAVOURITE = "Favourite-Stays",
  STAY_FEATURE = "Stay-Feature",
  STAY_IMAGE = "Stay-Image",
  STAY_PLACE_TYPE = "Stay-Place-Type",
  STAY_SERVICE = "Stay-Service",
  STAY_SURFACE_TYPE = "Stay-Surface-Type",
  TESTIMONIAL = "Testimonial",
  AIRPORT = "Airport",
  CHAT = "Chat",
  MESSAGE = "Message",
}

/**
 *  Enum representing different user statuses.
 *  This enum is used to manage user states consistently across the application.
 *  @enum EUserStatus
 *  @property {number} IN_ACTIVE - Represents an inactive user.
 *  @property {number} ACTIVE - Represents an active user.
 *  @property {number} BLOCKED - Represents a blocked user.
 *  @example
 *  const userStatus = EUserStatus.ACTIVE; // 1
 */
export enum EUserStatus {
  IN_ACTIVE = 0,
  ACTIVE = 1,
  BLOCKED = 2,
}

/**
 *  Enum representing different user roles.
 *  This enum is used to manage user roles consistently across the application.
 *  @enum EUserRole
 *  @property {string} GUEST - Represents a guest user.
 *  @property {string} HOST - Represents a host user.
 *  @property {string} ADMIN - Represents an admin user.
 *  @example
 *  const userRole = EUserRole.HOST; // "host"
 */
export enum EUserRole {
  GUEST = 'guest',
  HOST = 'host',
  ADMIN = 'admin',
}
