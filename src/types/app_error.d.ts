/**
 *  INFO: Interface representing an application error.
 * @remarks
 * This interface describes the structure of an application error.
 * @public
 */
declare interface AppErrorInterface {
  /**
   *  INFO: The HTTP status code of the error.
   */
  statusCode: number;

  /**
   *  INFO: The status of the error (either "fail" or "error").
   */
  status: string;

  /**
   *  INFO: Indicates whether the error is operational.
   */
  isOperational: boolean;

  /**
   *  INFO: The error message.
   */
  message: string;

  /**
   *  INFO: The stack trace of the error.
   * @remarks
   * This property may not be available in production environments.
   * It's optional and can be `undefined`.
   */
  stack?: string;
}
