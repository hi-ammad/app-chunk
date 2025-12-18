/**
 * interface for Business Payment
 * It includes properties such as id, business, stripe customer ID, stripe subscription ID,
 * stripe payment method, and status.
 * @interface IBusinessPayment
 * @property {Types.ObjectId} id - Unique identifier for the business payment.
 * @property {Types.ObjectId} business - Reference to the associated business.
 * @property {string} stripe_customer_id - Stripe customer ID associated with the payment.
 * @property {string} stripe_subscription_id - Stripe subscription ID associated with the payment.
 * @property {"card"} stripe_payment_method - Payment method used, currently only supports "card".
 * @property {"paid" | "unpaid" | "cancelled"} status - Current status of the payment.
 * @extends {ITimeStamp}
 */
interface IBusinessPayment extends ITimeStamp {
  id: Types.ObjectId;
  business: Types.ObjectId;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  stripe_payment_method: "card";
  status: "paid" | "unpaid" | "cancelled";
}

