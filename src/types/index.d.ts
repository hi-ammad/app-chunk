declare module "bun" {
  /**
   *  INFO: An interface representing the environment variables used in the application.
   */
  interface Env {
    //  INFO: SERVER_CONFIGURATION
    /**
     * The port number on which the server will run.
     * @example 3000
     */
    PORT: number;

    /**
     * The DSN (Data Source Name) for Sentry error tracking.
     * @example "https://0cf2ec68ecdbff@o450990600.ingest.us.sentry.io/4500236800000
     */
    SENTRY_DSN: string;

    /**
     * The environment in which the application is running.
     * @example "development"
     * @example "production"
     */
    NODE_ENV: string;

    /**
     * The version of the API.
     * @example "v1"
     */
    API_VERSION: string;

    //  INFO: DATABASE_CONFIGURATION
    /**
     * The username for connecting to the MongoDB database.
     * @example "admin"
     */
    MONGO_USERNAME: string;

    /**
     * The password for connecting to the MongoDB database.
     * @example "password123"
     */
    MONGO_PASSWORD: string;

    /**
     * The URL of the MongoDB database.
     * @example "mongodb://localhost:27017/mydatabase"
     */
    MONGO_URL: string;

    //  INFO: MAILTRAP_CONFIGURATION (FOR DEVELOPMENT ENVIRONMENT)
    /**
     * The email address from which emails will be sent in the development environment.
     * @example "noreply@example.com"
     */
    MAILTRAP_FROM: string;

    /**
     * The host address for the Mailtrap SMTP server.
     * @example "smtp.mailtrap.io"
     */
    MAILTRAP_HOST: string;

    /**
     * The port number for the Mailtrap SMTP server.
     * @example 2525
     */
    MAILTRAP_PORT: number;

    /**
     * The username for authenticating with the Mailtrap SMTP server.
     * @example "your_mailtrap_username"
     */
    MAILTRAP_USERNAME: string;

    /**
     * The password for authenticating with the Mailtrap SMTP server.
     * @example "your_mailtrap_password"
     */
    MAILTRAP_PASSWORD: string;

    //  INFO: SENDGRID_CONFIGURATION (FOR PRODUCTION ENVIRONMENT)
    /**
     * The email address from which emails will be sent in the production environment.
     * @example "dev@....com"
     */
    SENDGRID_SENDER_EMAIL: string;

    /**
     * The host address for the Sendgrid SMTP server.
     * @example "smtp.sendgrid.io"
     */
    SENDGRID_HOST: string;

    /**
     * The port number for the Sendgrid SMTP server.
     * @example 2525
     */
    SENDGRID_PORT: number;

    /**
     * The apiKey for authenticating with the Sendgrid SMTP server.
     * @example "your_apikey"
     */
    SENDGRID_API_KEY: string;

    //  INFO: AWS_S3_CONFIGURATION
    /**
     * The secret key for accessing the AWS S3 service.
     * @example "your_s3_secret_key"
     */
    S3_SECRET_KEY: string;

    /**
     * The access key for accessing the AWS S3 service.
     * @example "your_s3_access_key"
     */
    S3_ACCESS_KEY: string;

    /**
     * The name of the AWS S3 bucket.
     * @example "my-s3-bucket"
     */
    S3_BUCKET_NAME: string;

    /**
     * The region where the AWS S3 bucket is located.
     * @example "us-west-2"
     */
    S3_REGION: string;

    //  INFO: JWT_CONFIGURATION
    /**
     * The secret key used to sign JWT access tokens.
     * @example "your_jwt_access_secret"
     */
    JWT_ACCESS_SECRET: string;

    /**
     * The expiration time for JWT access tokens.
     * @example "1h"
     */
    JWT_ACCESS_EXPIRE: string;

    /**
     * The secret key used to sign JWT reset-password tokens.
     * @example "your_jwt_reset_secret"
     */
    JWT_RESET_SECRET: string;

    /**
     * The expiration time for JWT reset-password tokens.
     * @example "15m"
     */
    JWT_RESET_EXPIRE: string;

    /**
     * The secret key used to sign JWT refresh tokens.
     * @example "your_jwt_refresh_secret"
     */
    JWT_REFRESH_SECRET: string;

    /**
     * The expiration time for JWT refresh tokens.
     * @example "7d"
     */
    JWT_REFRESH_EXPIRE: string;

    //  INFO: REDIS_CONFIGURATION
    /**
     * The password for authenticating with the Redis server.
     * @example "your_redis_password"
     */
    REDIS_PASSWORD: string;

    /**
     * The host address of the Redis server.
     * @example "127.0.0.1"
     */
    REDIS_HOST: string;

    /**
     * The port number for the Redis server.
     * @example 6379
     */
    REDIS_PORT: number;

    /*  INFO: SCRAPING */
    /**
     * The URL for the scraping endpoint.
     * @example 'http://api.scraping-bot.io/scrape/retail'
     */
    SCRAP_ENDPOINT: string;


    /*  INFO: GOOGLE_AUTH_SSO */
    /**
     * Client ID obtained from Google Cloud Console when setting up OAuth credentials.
     * @example 'xJssxaHawdda'
     */
    GOOGLE_CLIENT_ID: string;

    /**
     * Client secret obtained from Google Cloud Console when setting up OAuth credentials.
     * @example 'kHhjbdYcssHxa'
     */
    GOOGLE_CLIENT_SECRET: string;

    /**
     * Redirect URL where Google will redirect after authentication.
     * @example 'uHhsxJaksdaJJ'
     */
    GOOGLE_REDIRECT_URI: string;
  }
}

/**
 * Extending the Express Request interface to include the user property.
 */
declare namespace Express {
  /**
   * Augment the existing Request interface to include a user property.
   * The user property contains the user data and methods defined in IUser and IUserMethods interfaces.
   */
  export interface Request {
    /**
     *  INFO: The user property represents the authenticated user.
     * It includes properties and methods from both IUser and IUserMethods interfaces.
     */
    user: IUser & IUserMethods;
  }
}

/**
 * Extending the Mongoose Query interface to include caching methods and properties.
 */
declare module "mongoose" {
  export interface Query<ResultType, DocType extends Document, THelpers = {}> {
    /**
     *  INFO: Enables caching for the query with optional settings.
     * @param options - An object containing caching options.
     * @param options.key - An optional key to uniquely identify the cached data.
     * @returns The current query instance.
     */
    cache(options: {
      key?: string;
    }): MongooseQuery<ResultType, DocType, THelpers>;

    /**
     * Indicates whether the query is using caching.
     */
    useCache: boolean;

    /**
     * Indicates whether the query result is cached.
     */
    isCached: boolean;

    /**
     * The hash key used to store the cached result.
     */
    hashKey: string;

    /**
     * The model associated with the query.
     */
    model: Model<DocType>;
  }
}

/**
 *  INFO: Function signature for restricting access to certain roles.
 * @param {string[]} roles - The roles to which access should be restricted.
 * @returns {(req: Express.Request, res: Express.Response, next: Express.NextFunction) => void} A middleware function that restricts access based on the provided roles.
 */
declare type RestrictToFunction = (
  ...roles: string[]
) => (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
) => void;

/**
 * Middleware function to protect routes by verifying user authentication.
 * @remarks
 * This middleware extracts the access token from the request headers or cookies,
 * verifies the token, and checks if the user exists and is authenticated.
 * If the user is authenticated, it grants access to protected routes by setting
 * the user object on the request object and forwarding the request to the next middleware.
 * If the user is not authenticated or the token is invalid, it sends an error response.
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @param next - The next function in the middleware chain.
 * @returns void
 */
declare type Iprotect = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
) => void;

/**
 * Function signature for async middleware wrapper.
 * @param {Function} fn - The async middleware function to be wrapped.
 * @returns {(req: Express.Request, res: Express.Response, next: Express.NextFunction) => void} A middleware function that handles async operations in the provided middleware function and forwards errors to Express error handling middleware.
 */
declare type AsyncMiddlewareWrapper = (
  fn: (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction,
  ) => Promise<any>,
) => (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
) => void;
