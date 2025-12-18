import { Message } from "@/modal";
import { createMessageJoi, updateMessageJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createMessage = handleFactory.createOne(Message, createMessageJoi);

export const getSingleMessage = handleFactory.getOne(Message);

export const getAllMessages = handleFactory.getAll(Message);

export const updateMessage = handleFactory.updateOne(Message, updateMessageJoi);

export const deleteMessage = handleFactory.deleteOne(Message);
