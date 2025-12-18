import { GalleryMedia } from "@/modal";
import { createGalleryMediaJoi, updateGalleryMediaJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createGalleryMedia = handleFactory.createOne(GalleryMedia, createGalleryMediaJoi, true);

export const getSingleGalleryMedia = handleFactory.getOne(GalleryMedia);

export const getAllGalleryMedias = handleFactory.getAll(GalleryMedia);

export const updateGalleryMedia = handleFactory.updateOne(GalleryMedia, updateGalleryMediaJoi);

export const deleteGalleryMedia = handleFactory.deleteOne(GalleryMedia);
