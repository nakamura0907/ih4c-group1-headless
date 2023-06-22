import { externalCourseApi } from "./api/strapi";
import { CourseApi } from "./types";

export type { Course } from "./types";
export const services: CourseApi = externalCourseApi();