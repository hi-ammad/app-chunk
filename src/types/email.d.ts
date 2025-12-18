/**
 *  INFO: Represents an email object used for sending emails.
 * @public
 */
interface IEmail {
  /**
   * The recipient email address.
   */
  to: string;

  /**
   * The first name of the recipient.
   */
  firstName: string;

  /**
   * The URL associated with the email.
   */
  url: string;

  /**
   * The one-time password (OTP) for the email.
   */
  otp: string;

  /**
   * The sender email address.
   */
  from: string;

  /**
   *  INFO: Creates a new email transport.
   * @returns The email transport instance.
   */
  newTransport(): any;

  /**
   *  INFO: Sends an email with the specified template and subject.
   * @param template - The name of the email template.
   * @param subject - The subject of the email.
   */
  send(template: string, subject: string): Promise<void>;

  /**
   *  INFO: Sends a welcome message to the user asynchronously.
   *
   * This method sends a predefined welcome message to users, utilizing
   * an underlying messaging service provided by the current instance.
   *
   * @remarks
   * This method is asynchronous and waits for the message to be sent
   * before completing execution.
   *
   * @returns A promise that resolves once the welcome message is successfully sent.
   *
   * @throws Throws an error if the message sending fails.
   */
  sendWelcome(): Promise<void>;

  /**
 *  INFO: Sends a welcome message to the admin asynchronously.
 *
 * This method sends a predefined welcome message to admin, utilizing
 * an underlying messaging service provided by the current instance.
 *
 * @remarks
 * This method is asynchronous and waits for the message to be sent
 * before completing execution.
 *
 * @returns A promise that resolves once the welcome message is successfully sent.
 *
 * @throws Throws an error if the message sending fails.
 */
  sendAdminWelcome(): Promise<void>;

  /**
   *  INFO: Sends a verification OTP (One-Time Password) asynchronously.
   *
   * This method sends a one-time password (OTP) for verification purposes,
   * using an underlying messaging service provided by the current instance.
   *
   * @remarks
   * This method is asynchronous and waits for the OTP message to be sent
   * before completing execution.
   *
   * @returns A promise that resolves once the OTP message is successfully sent.
   *
   * @throws Throws an error if the OTP message sending fails.
   */
  sendVerification(): Promise<void>;

  /**
   *  INFO: Sends a verification email to the user asynchronously.
   *
   * This method sends a verification email to the user, welcoming them
   * to the ... Family, using an underlying email sending service
   * provided by the current instance.
   *
   * @remarks
   * This method is asynchronous and waits for the email to be sent
   * before completing execution.
   *
   * @returns A promise that resolves once the verification email is successfully sent.
   *
   * @throws Throws an error if the email sending fails.
   */
  verifyEmail(): Promise<void>;

  /**
   *  INFO: Sends a password reset token to the user asynchronously.
   *
   * This method sends a password reset token to the user, providing instructions
   * on how to reset their password, using an underlying messaging service
   * provided by the current instance.
   *
   * @remarks
   * This method is asynchronous and waits for the password reset token to be sent
   * before completing execution.
   *
   * @returns A promise that resolves once the password reset token is successfully sent.
   *
   * @throws Throws an error if the password reset token sending fails.
   */
  sendPasswordReset(): Promise<void>;
}

export default IEmail;
