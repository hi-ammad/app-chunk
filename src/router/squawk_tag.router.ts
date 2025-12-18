import { Router } from "express";
import {
  createSquawkTag,
  deleteSquawkTag,
  getAllSquawkTags,
  getSingleSquawkTag,
  updateSquawkTag,
} from "@/service/squawk_tag.service";
import { routeWdVersion } from '@/library/utils';

const router = Router();

router
  .route(routeWdVersion("squawk/tag"))
  .post(createSquawkTag)
  .get(getAllSquawkTags);

router
  .route(routeWdVersion("squawk/tag/:id"))
  .get(getSingleSquawkTag)
  .patch(
    updateSquawkTag,
  )
  .delete(
    deleteSquawkTag,
  );

export default router;
