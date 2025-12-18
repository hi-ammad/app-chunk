
import { Router } from "express";
import {
  createCountry,
  deleteCountry,
  getAllCountries,
  getSingleCountry,
  updateCountry,
} from "../service/country.service.ts";
import { routeWdVersion } from '@/library/utils';

const router = Router();

router.route(routeWdVersion("country")).post(createCountry).get(getAllCountries);
router
  .route(routeWdVersion("country/:id"))
  .get(getSingleCountry)
  .patch(
    updateCountry,
  )
  .delete(
    deleteCountry,
  );

export default router;
