import { Chat } from "@/modal";
import { createChatJoi, updateChatJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createChat = handleFactory.createOne(Chat, createChatJoi);

export const getSingleChat = handleFactory.getOne(Chat);

export const getAllChats = handleFactory.getAll(Chat);

export const updateChat = handleFactory.updateOne(Chat, updateChatJoi);

export const deleteChat = handleFactory.deleteOne(Chat);
