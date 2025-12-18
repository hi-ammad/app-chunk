
import { Country } from "@/modal";
import { updateCountryJoi, createCountryJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createCountry = handleFactory.createOne(Country, createCountryJoi, true);

export const getSingleCountry = handleFactory.getOne(Country);

export const getAllCountries = handleFactory.getAll(Country);

export const updateCountry = handleFactory.updateOne(Country, updateCountryJoi);

export const deleteCountry = handleFactory.deleteOne(Country);
