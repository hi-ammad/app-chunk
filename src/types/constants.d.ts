/**
 * Represents a constant configuration object for the application.
 * @interface
 */
interface IConstant {
  /**
   * Server configuration object containing port, API version, and Node environment.
   * @type {{ port: number; apiVersion: string; nodeEnv: string }}
   * @property {number} port - The port number on which the server will run.
   * @property {string} apiVersion - The version of the API.
   * @property {string} nodeEnv - The environment in which the application is running (e.g., development, production).
   */
  server: { port: number; apiVersion: string; nodeEnv: string };

  /**
   * Sentry configuration object containing the DSN (Data Source Name).
   * @type {{ dsn: string }}
   * @property {string} dsn - The DSN for Sentry error tracking.
   */
  sentry: { dsn: string };

  /**
   * Database configuration object containing the URL.
   * @type {{ url: string }}
   * @property {string} url - The URL of the MongoDB database.
   * @example "mongodb://localhost:27017/mydatabase"
   */
  db: { url: string };

  /**
   * Mailtrap configuration object containing from, host, port, userName, and password.
   * @property {string} from - The email address from which emails will be sent in the development environment.
   * @property {string} host - The host address for the Mailtrap SMTP server.
   * @property {number} port - The port number for the Mailtrap SMTP server.
   * @property {string} userName - The username for the Mailtrap SMTP server.
   * @property {string} password - The password for the Mailtrap SMTP server.
   */
  mailtrap: {
    from: string;
    host: string;
    port: number;
    userName: string;
    password: string;
  };

  /**
   * Sendgrid configuration object containing from, host, port, and apiKey .
   * @property {string} from - The email address from which emails will be sent using Sendgrid.
   * @property {string} host - The host address for the Sendgrid SMTP server.
   * @property {number} port - The port number for the Sendgrid SMTP server.
   * @property {string} apiKey - The API key for authenticating with Sendgrid.
   */
  sendgrid: {
    from: string;
    host: string;
    port: number;
    apiKey: string;
  };

  /**
   * Amazon S3 configuration object containing bucket, secretKey, accessKey, and region.
   * @type {{ bucket: string; secretKey: string; accessKey: string; region: string }}
   * @property {string} bucket - The name of the S3 bucket.
   * @property {string} secretKey - The secret key for accessing the S3 bucket.
   * @property {string} accessKey - The access key for accessing the S3 bucket.
   * @property {string} region - The AWS region where the S3 bucket is located.
   */
  s3: {
    bucket: string;
    secretKey: string;
    accessKey: string;
    region: string;
  };

  /**
   * JWT configuration object containing accessSecret, accessExpire, refreshSecret, and refreshExpire.
   * @type {{ accessSecret: string; accessExpire: string; refreshSecret: string; refreshExpire: string }}
   * @property {string} accessSecret - The secret key used to sign access tokens.
   * @property {string} accessExpire - The expiration time for access tokens.
   * @property {string} refreshSecret - The secret key used to sign refresh tokens.
   * @property {string} refreshExpire - The expiration time for refresh tokens.
   * @property {string} resetExpire - The expiration time for password reset tokens.
   * @property {string} resetSecret - The secret key used to sign password reset tokens.
   */
  jwt: {
    accessSecret: string;
    accessExpire: string;
    refreshSecret: string;
    refreshExpire: string;
    resetExpire: string;
    resetSecret: string;
  };

  /**
   * Redis configuration object containing password, host, and port.
   * @type {{ password: string; host: string; port: number }}
   * @property {string} password - The password for authenticating with the Redis server.
   * @property {string} host - The host address of the Redis server.
   * @property {number} port - The port number on which the Redis server is running.
   */
  redis: {
    password: string;
    host: string;
    port: number;
  };

  /**
   * Google Account - clientId , clientSecret , redirectUrl
   * @type {{ clientId: string; clientSecret: string; redirectUrl: string }}
   * @property {string} clientId - The client ID for Google OAuth authentication.
   * @property {string} clientSecret - The client secret for Google OAuth authentication.
   * @property {string} redirectUrl - The redirect URL for Google OAuth authentication.
   */
  google: {
    clientId: string;
    clientSecret: string;
    redirectUrl: string;
  };
}
