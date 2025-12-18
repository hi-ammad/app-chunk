import { BusinessPayment } from "@/modal";
import { createBusinessPaymentJoi, updateBusinessPaymentJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createBusinessPayment = handleFactory.createOne(BusinessPayment, createBusinessPaymentJoi);

export const getSingleBusinessPayment = handleFactory.getOne(BusinessPayment);

export const getAllBusinessPayments = handleFactory.getAll(BusinessPayment);

export const updateBusinessPayment = handleFactory.updateOne(BusinessPayment, updateBusinessPaymentJoi);

export const deleteBusinessPayment = handleFactory.deleteOne(BusinessPayment);

