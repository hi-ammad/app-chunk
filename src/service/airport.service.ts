import { Airport } from "@/modal";
import { createAirportJoi, updateAirportJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createAirport = handleFactory.createOne(Airport, createAirportJoi);

export const getSingleAirport = handleFactory.getOne(Airport);

export const getAllAirports = handleFactory.getAll(Airport);

export const updateAirport = handleFactory.updateOne(Airport, updateAirportJoi);

export const deleteAirport = handleFactory.deleteOne(Airport);
