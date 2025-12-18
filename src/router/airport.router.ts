import { Router } from "express";
import {
  createAirport,
  deleteAirport,
  getAllAirports,
  getSingleAirport,
  updateAirport,
} from "@/service/airport.service.ts";
import { routeWdVersion } from '@/library/utils';

const router = Router();

router
  .route(routeWdVersion("stay/airport"))
  .post(createAirport)
  .get(getAllAirports);

router
  .route(routeWdVersion("stay/airport/:id"))
  .get(getSingleAirport)
  .patch(
    updateAirport,
  )
  .delete(
    deleteAirport,
  );

export default router;
