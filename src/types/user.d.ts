/**
 * Represents a user object with various properties.
 * Extends ITimeStamp for timestamp properties.
 * @property {Types.ObjectId} id - Unique identifier for the user.
 * @property {string} [first_name] - First name of the user.
 * @property {string} [last_name] - Last name of the user.
 * @property {string} native_language - The user's native language.
 * @property {string[]} [other_language] - Array of other languages spoken by the user.
 * @property {string} phone - Primary phone number of the user.
 * @property {string} other_phone - Secondary phone number of the user.
 * @property {string} email - Primary email address of the user.
 * @property {string} additional_email - Additional email address of the user.
 * @property {boolean} [airmen_verified] - Indicates if the user's airmen certificate
 */
interface IUser extends ITimeStamp {
  /** Unique identfier for the user. */
  id: Types.ObjectId;

  /** first_name of the user. */
  first_name?: string;

  /** middle_name of the user. */
  middle_name?: string;

  /** last_name of the user. */
  last_name?: string;

  /** native_language */
  native_language: string;

  /** other_languages of the user */
  other_language?: [string];

  /** phone */
  phone: string;

  /** other_phone */
  other_phone: string;

  /** email */
  email: string;

  /** additional_email */
  additional_email: string;

  /** airmen_verified */
  airmen_verified?: boolean;

  /** airmen_certificate_front image url of the user. */
  airmen_certificate_front?: string;

  /** airmen_certificate_back image url of the user. */
  airmen_certificate_back?: string;

  /** driving_license_front image url of the user. */
  driving_license_front?: string;

  /** driving_license_back image url of the user. */
  driving_license_back?: string;

  /** driving_license_verified */
  driving_license_verified: boolean;

  /** reset_password_token of the user. */
  reset_password_token?: string;

  /** bio of the user. */
  bio?: string;

  /** provider - local,google,apple  */
  provider: string;

  /** email verification_string */
  verification_string?: string;

  /** 
   * This includes the address, city, state, zip code, neighbourhood, and country.
   * @property {string} address - The street address of the user.
   * @property {string} city - The city where the user resides.
   * @property {string} state - The state where the user resides.
   * @property {string} zip_code - The postal code for the user's address.
   * @property {string} neighbourhood - The neighbourhood where the user resides (optional).
   * @property {string} country - The country where the user resides.
   * */
  mailing_address?: {
    address: string;
    city: string;
    state: string;
    zip_code: string;
    neighbourhood?: string;
    country: string;
  };
  /** 
   * This includes the contact details of the user.
   * @property {string} name - The name of the contact person.
   * @property {string} phone - The phone number of the contact person.
   * @property {string} email - The email address of the contact person.
   * @property {string} relationship - The relationship of the contact person to the user.
   */
  contact?: {
    name?: string;
    phone?: string;
    email?: string;
    relationship?: string;
  };
  /** 
   * This includes the social media links of the user.
   * @property {string} facebook - The Facebook profile URL of the user.
   * @property {string} twitter - The Twitter profile URL of the user.
   * @property {string} linkedin - The LinkedIn profile URL of the user.
   * @property {string} google_plus - The Google Plus profile URL of the user.
   * @property {string} instagram - The Instagram profile URL of the user.
   * @property {string} pinterest - The Pinterest profile URL of the user.
   * @property {string} youtube - The YouTube channel URL of the user.
   * @property {string} vimeo - The Vimeo channel URL of the user.
   * @property {string} airbnb - The Airbnb profile URL of the user.
   * @property {string} top_advisor - The Top Advisor profile URL of the user.
   */
  social_links?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    google_plus?: string;
    instagram?: string;
    pinterest?: string;
    youtube?: string;
    vimeo?: string;
    airbnb?: string;
    top_advisor?: string;
  };

  /** status of user (0 - inactive, 1 - active, 2 - blocked) */
  status?: number; // 0 - inactive, 1 - active, 2 - blocked

  /** prfile photo of the user*/
  photo?: string;

  id_verified?: boolean;

  /** email_verified */
  email_verified: boolean;

  /** email_verified_at */
  email_verified_at: Date;

  /** stripe_customer_id */
  stripe_customer_id: string;

  /** is_subscribed_to_newsletter */
  is_subscribed_to_newsletter?: boolean;

  /** account_type - premium, basic, standard */
  account_type?: "premium" | "basic" | "standard";

  /** stripe_host_id */
  stripe_host_id?: string;

  /** role of the user, [guest,host]*/
  role: string[];

  /** password of the user*/
  password: string;

  /** user_name */
  user_name: string;

  /** display_name of the user */
  display_name: string;

  /** native_language */
  native_language: string;

  /** other_languages of the user */
  other_language?: [string];

  additional_email: string;

  /** OTP for resetting password. */
  password_reset_otp?: string;

  /** Expiration date for password reset OTP. */
  password_reset_expires?: Date;

  /** OTP for email verification. */
  verify_otp?: string;

  /** Expiration date for email verification OTP. */
  otp_verify_expires?: string;

  /** Timestamp indicating when the password was last changed. */
  password_changedAt?: number;

  /** Array of refresh tokens associated with the user. */
  refreshToken: Types.Array<String>;

  /** Password reset token for the user. */
  password_reset_token?: string;

}

/**
 *  INFO: Represents methods available for a user object.
 */
declare interface IUserMethods {
  /**
   *  INFO: Generates a password reset token.
   * @returns A promise that resolves to the generated password reset token.
   */
  createPasswordReset(): Promise<string>;

  /**
   *  INFO: Checks if the password was changed after a certain JWT timestamp.
   * @param jwtTimestamp - The timestamp from a JWT token.
   * @returns A boolean indicating whether the password was changed after the given timestamp.
   */
  changePasswordAfter(jwtTimestamp: number): boolean;

  /**
   *  INFO: Compares a given password with the user's stored password hash.
   * @param password - The password to compare.
   * @returns A boolean indicating whether the given password matches the user's stored password hash.
   */
  comparePassword(password: string): boolean;
}

/**
 *  INFO: Represents a model for user objects.
 * Extends Model with IUser as the document type and IUserMethods as additional instance methods.
 */
type UserModel = Model<IUser, {}, IUserMethods>;
