import { Router } from "express";
import {
  createSquawkComment,
  deleteSquawkComment,
  getAllSquawkComments,
  getSingleSquawkComment,
  updateSquawkComment,
} from "@/service/squawk_comment.service";
import { routeWdVersion } from '@/library/utils';

const router = Router();

router
  .route(routeWdVersion("squawk/comment"))
  .post(createSquawkComment)
  .get(getAllSquawkComments);

router
  .route(routeWdVersion("squawk/comment/:id"))
  .get(getSingleSquawkComment)
  .patch(
    updateSquawkComment,
  )
  .delete(
    deleteSquawkComment,
  );

export default router;
