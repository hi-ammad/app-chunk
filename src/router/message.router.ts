import { Router } from "express";
import {
  createMessage,
  deleteMessage,
  getAllMessages,
  getSingleMessage,
  updateMessage,
} from "@/service/message.service.ts";
import { routeWdVersion } from '@/library/utils';

const router = Router();

router
  .route(routeWdVersion("chat/message"))
  .post(createMessage)
  .get(getAllMessages);

router
  .route(routeWdVersion("chat/message/:id"))
  .get(getSingleMessage)
  .patch(
    updateMessage,
  )
  .delete(
    deleteMessage,
  );

export default router;
