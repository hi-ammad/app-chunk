import { Testimonial } from "@/modal";
import { createTestimonialJoi, updateTestimonialJoi } from "@/validation";
import handleFactory from "./handle.service";

export const createTestimonial = handleFactory.createOne(Testimonial, createTestimonialJoi);

export const getSingleTestimonial = handleFactory.getOne(Testimonial);

export const getAllTestimonials = handleFactory.getAll(Testimonial);

export const updateTestimonial = handleFactory.updateOne(Testimonial, updateTestimonialJoi);

export const deleteTestimonial = handleFactory.deleteOne(Testimonial);
