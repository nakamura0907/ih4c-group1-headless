import { externalCourseApi } from "./api/external";
import { CourseApi } from "./types";

export type { Course } from "./types";
export const services: CourseApi = externalCourseApi();