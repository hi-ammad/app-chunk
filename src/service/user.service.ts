import { User } from "@/modal";
import { updateUserJoi } from "@/validation";
import handleFactory from "./handle.service";

export const getSingleUser = handleFactory.getOne(User);

export const getAllUsers = handleFactory.getAll(User);

export const updateUser = handleFactory.updateOne(User, updateUserJoi);

export const deleteUser = handleFactory.deleteOne(User);

