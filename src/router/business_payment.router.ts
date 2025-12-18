import { Router } from "express";
import {
  createBusinessPayment,
  deleteBusinessPayment,
  getAllBusinessPayments,
  getSingleBusinessPayment,
  updateBusinessPayment,
} from "@/service/business_payment.service";
import { routeWdVersion } from '@/library/utils';

const router = Router();

router
  .route(routeWdVersion("business/payment"))
  .post(createBusinessPayment)
  .get(getAllBusinessPayments);

router
  .route(routeWdVersion("business/payment/:id"))
  .get(getSingleBusinessPayment)
  .patch(
    updateBusinessPayment,
  )
  .delete(
    deleteBusinessPayment,
  );

export default router;
