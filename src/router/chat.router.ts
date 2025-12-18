import { Router } from "express";
import {
  createChat,
  deleteChat,
  getAllChats,
  getSingleChat,
  updateChat,
} from "@/service/chat.service.ts";
import { routeWdVersion } from '@/library/utils';

const router = Router();

router
  .route(routeWdVersion("chat"))
  .post(createChat)
  .get(getAllChats);

router
  .route(routeWdVersion("chat/:id"))
  .get(getSingleChat)
  .patch(
    updateChat,
  )
  .delete(
    deleteChat,
  );

export default router;
