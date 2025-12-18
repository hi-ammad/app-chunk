import { routeWdVersion } from "@/library/utils";

export class Route {
  static get signUp() {
    return routeWdVersion("auth/sign-up");
  }
  static get login() {
    return routeWdVersion("auth/login");
  }

  /* e.g. /api/v1/auth/check-email/:email
   * :email is a placeholder for the email to check 
   * will be replaced with the actual email when making the request
   */
  static get checkEmail() {
    return routeWdVersion("auth/check-email");
  }

  /* /api/v1/auth/check-displayname/:displayName
   * :displayName is a placeholder for the displayName to check
   * will be replaced with the actual displayName when making the request
   */
  static get checkDisplayName() {
    return routeWdVersion("auth/check-displayname");
  }

  static get clearCache() {
    return routeWdVersion("clear-cache");
  }

  static get ping() {
    return routeWdVersion("ping");
  }

  static get business() {
    return routeWdVersion("business");
  }

  static get businessPayment() {
    return routeWdVersion("business/payment");
  }

  static get businessType() {
    return routeWdVersion("business/type");
  }

  static get cancellationPolicy() {
    return routeWdVersion("stay/cancellation-policy");
  }

  static get country() {
    return routeWdVersion("country");
  }

  static get galleryMedia() {
    return routeWdVersion("gallery/media");
  }

  static get review() {
    return routeWdVersion("review");
  }

  static get squawk() {
    return routeWdVersion("squawk");
  }

  static get squawkCategory() {
    return routeWdVersion("squawk/category");
  }

  static get squawkComment() {
    return routeWdVersion("squawk/comment");
  }

  static get squawkTag() {
    return routeWdVersion("squawk/tag");
  }

  static get airport() {
    return routeWdVersion("stay/airport");
  }

  static get booking() {
    return routeWdVersion("stay/booking");
  }

  static get bookingExpense() {
    return routeWdVersion("stay/booking-expense");
  }

  static get stayPostCheckout() {
    return routeWdVersion("stay/post-checkout");
  }

  static get transaction() {
    return routeWdVersion("stay/booking-transaction");
  }

  static get calendar() {
    return routeWdVersion("stay/calendar");
  }

  static get stay() {
    return routeWdVersion("stay");
  }

  // stay extra service
  static get stayExtraService() {
    return routeWdVersion("stay/extra-service");
  }

  // stay fav
  static get stayFav() {
    return routeWdVersion("stay/fav");
  }

  // stay feature
  static get stayFeature() {
    return routeWdVersion("stay/feature");
  }

  // stay image
  static get stayImage() {
    return routeWdVersion("stay/image");
  }

  // stay place
  static get stayPlaceType() {
    return routeWdVersion("stay/place-type");
  }

  // stay service
  static get stayService() {
    return routeWdVersion("stay/service-type");
  }

  // space type
  static get staySpaceType() {
    return routeWdVersion("stay/space-type");
  }

  // surface type
  static get staySurfaceType() {
    return routeWdVersion("stay/surface-type");
  }

  // testimonial
  static get testimonial() {
    return routeWdVersion("testimonial");
  }

  // user
  static get user() {
    return routeWdVersion("user");
  }

}
