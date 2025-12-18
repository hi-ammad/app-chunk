import "@/library/sentry"
import express, { type Express } from "express";
import * as Sentry from "@sentry/node"
import { Server } from "http";
import { chatRouter, messageRouter, squawkCommentRouter, squawkCategoryRouter, squawkRouter, reviewRouter, galleryMediaRouter, authRouter, cancellationPolicyRouter, businessUploadRouter, businessTypeRouter, userRouter, meRouter, businessRouter, stayRouter, businessPaymentRouter, countryRouter, squawkTagRouter, stayCalendarRouter, bookingExpenseRouter, bookingRouter, postCheckoutRouter, bookingTransactionRouter, stayExtraServiceRouter, favRouter, stayFeatureRouter, stayImageRouter, stayPlaceTypeRouter, stayServiceTypeRouter, staySpaceTypeRouter, staySurfaceTypeRouter, testimonialRouter, airportRouter } from "@/router";

import errorMiddleware from "@/middleware/error.middleware";
import { protect } from "@/middleware/auth.middleware";
import RedisCache from "@/library/redis";
import expressLogger from "@/middleware/express.logger";
import cookieParser from "cookie-parser";
import { routeWdVersion } from "@/library/utils";
import { Constant } from "./constants";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { winsLogger } from "./library/logger";

export default class App {
  private static _instance: App;
  readonly app: Express;
  private _listener!: Server;

  private constructor() {
    this.app = express();
    this.initialize();
  }

  get listener(): Server {
    return this._listener;
  }

  static get instance(): App {
    if (App._instance != null) return App._instance;
    this._instance = new App();
    return App._instance;
  }

  initialize() {
    this.intializeMiddleware();
    this.initializeRouter();
  }

  private intializeMiddleware() {

    // Set security HTTP headers
    this.app.use(helmet());

    // Limit requests from same API
    const limiter = rateLimit({
      max: Constant.instance.server.nodeEnv !== 'test' ? 100 : 1000,
      windowMs: 60 * 60 * 1000,
      standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
      handler: (req, res) => {
        res.status(429).json({
          status: "fail",
          message: "Too many requests from this IP, please try again in an hour!",
        });
        winsLogger.warn(`Rate limit reached for IP: ${req.ip} on route: ${req.originalUrl}`);
        Sentry.logger.warn("Rate limit reached for user", {
          ip: req.ip,
          route: req.originalUrl,
          limit: '100 requests per hour'
        });
      }
    });

    this.app.use('/api', limiter);

    this.app.use(cors())
    /* MIDDLEWARE:CORS */
    // this.app.options('*', corsPolicy);
    // this.app.use(corsPolicy);

    /* MIDDLEWARE:COOKIE-PARSER */
    this.app.use(cookieParser());

    /* MIDDLEWARE:EXPRESS_LOGGER */
    if (Constant.instance.server.nodeEnv !== 'test') this.app.use(expressLogger);

    /* MIDDLEWARE:BODY_PARSER */
    this.app.use(express.json());

    /* MIDDLEWARE:MAX_SIZE */
    this.app.use(express.json({ limit: "256kb" }));

    /* MIDDLEWARE:STATIC_FILES */
    this.app.use("/static", express.static("public"));

    /* MIDDLEWARE:PARSE_FORM-DATA */
    this.app.use(express.urlencoded({ extended: true, limit: "256kb" }));
  }

  private initializeRouter() {
    this.app.route(routeWdVersion("/")).get(async (_, res) => {
      res.redirect("/static/welcome/index.html");
    });

    /* ROUTE:PING */
    this.app.route(routeWdVersion("ping")).get(async (_, res) => {
      res.status(200).json({ ping: "Pong 😄" });
    });

    /* ROUTE:CLEAR-CACHE */
    this.app.route(routeWdVersion("clear-cache")).get(async (_, res) => {
      const clearCache = await RedisCache.instance.client.flushAll();
      res.status(200).json({ message: "Success :)", clearCache });
    });

    this.app.get("/debug-sentry", function mainHandler(req, res) {
      throw new Error("My first Sentry error!");
    });

    /* ROUTER:AUTH */
    this.app.use(authRouter);

    /* MIDDLEWARE:PROTECT - CHECK_JWT_TOKEN */
    this.app.use(protect);

    /* ROUTER:ME */
    this.app.use(meRouter)

    /* ROUTER:BUSINESS_PAYMENT */
    this.app.use(businessPaymentRouter);

    /* ROUTER:BUSINESS_TYPE */
    this.app.use(businessTypeRouter);

    /* ROUTER:BUSINESS_UPLOAD */
    this.app.use(businessUploadRouter);

    /* ROUTER:BUSINESS */
    this.app.use(businessRouter);

    /* ROUTER:STAY_CALENDAR_ROUTER */
    this.app.use(stayCalendarRouter);

    /* ROUTER:BOOKING_EXPENSE */
    this.app.use(bookingExpenseRouter);

    /* ROUTER:BOOKING_TRANSACTION */
    this.app.use(bookingTransactionRouter);

    /* ROUTER:EXTRA_SERVICE */
    this.app.use(stayExtraServiceRouter);

    /* ROUTER:POST_CHECKOUT */
    this.app.use(postCheckoutRouter);

    /* ROUTER:BOOKING_ROUTER */
    this.app.use(bookingRouter);

    /* ROUTER:STAY_FEATURE */
    this.app.use(stayFeatureRouter);

    /* ROUTER:STAY_AIRPORT */
    this.app.use(airportRouter);

    /* ROUTER:STAY_IMAGE */
    this.app.use(stayImageRouter);

    /* ROUTER:STAY_PLACE_TYPE_ROUTER */
    this.app.use(stayPlaceTypeRouter);

    /* ROUTER:STAY_SPACE_TYPE_ROUTER */
    this.app.use(staySpaceTypeRouter);

    /* ROUTER:STAY_SURFACE_TYPE_ROUTER */
    this.app.use(staySurfaceTypeRouter);

    /* ROUTER:STAY_SERVICE_TYPE */
    this.app.use(stayServiceTypeRouter);

    /* ROUTER:CANCELLATION_POLICY */
    this.app.use(cancellationPolicyRouter);

    /* ROUTER:STAY_ROUTER */
    this.app.use(stayRouter);

    /* ROUTER:BUSINESS_TYPE */
    this.app.use(businessTypeRouter);

    /* ROUTER:BUSINESS_UPLOAD */
    this.app.use(businessUploadRouter);

    /* ROUTER:COUNTRY */
    this.app.use(countryRouter);

    /* ROUTER:GALLERY_MEDIA */
    this.app.use(galleryMediaRouter);

    /* ROUTER:REVIEW */
    this.app.use(reviewRouter);

    /* ROUTER:SQUAWK_CATEGORY */
    this.app.use(squawkCategoryRouter);

    /* ROUTER:SQUAWK_COMMENT */
    this.app.use(squawkCommentRouter);

    /* ROUTER:SQUAWK_TAGS */
    this.app.use(squawkTagRouter);

    /* ROUTER:SQUAWK */
    this.app.use(squawkRouter);

    /* ROUTER:USER_FAVOURITE_STAY */
    this.app.use(favRouter);

    /* ROUTER:USER */
    this.app.use(userRouter);

    /* ROUTER:TESTIMONIAL */
    this.app.use(testimonialRouter);

    /* ROUTER: MESSAGE */
    this.app.use(messageRouter)

    /* ROUTER: CHAT */
    this.app.use(chatRouter)

    // The error handler must be registered before any other error middleware and after all controllers
    Sentry.setupExpressErrorHandler(this.app);

    /* MIDDLEWARE: ERROR */
    this.app.use(errorMiddleware);

    /* MIDDLEWARE:NOT_FOUND */
    this.app.get("*", function (req, res) {
      res.status(404).json({
        status: "fail",
        message: `Ohh you are lost, can't find route ${req.url} - read the API documentation to find your way back home :)`,
      });
    });
  }
}
