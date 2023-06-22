import axios from "axios";
import { Course, CourseApi } from "../types";
import { StrapiGetEntriesResponse, StrapiGetEntryResponse, StrapiModelCourse, strapiBaseUrl, strapiToken } from "@/utils/fetcher/strapi";
import { translateStrapiSpotToSpot } from "../../spot/api/strapi";


export const externalCourseApi = (): CourseApi => {
    const fetchModelCourseList = async (): Promise<Course[]> => {

        const response = await axios.get<StrapiGetEntriesResponse<StrapiModelCourse>>(`${strapiBaseUrl}/model-courses?populate[spots][populate][0]=photo,category`, {
            headers: {
                Authorization: `Bearer ${strapiToken}`
            }
        })
        const courses: Course[] = response.data.data.map((course) => {
            const route = course.attributes.spots.data.map(translateStrapiSpotToSpot)

            return {
                id: course.id.toString(),
                route
            }
        })

        return courses
    }

    const fetchModelCourseById = async (id: string) => {
        const url = `model-courses/${id}?populate[spots][populate][0]=photo,category`;

        const response = await axios.get<StrapiGetEntryResponse<StrapiModelCourse>>(`${strapiBaseUrl}/${url}`, {
            headers: {
                Authorization: `Bearer ${strapiToken}`
            }
        });
        const responseData = response.data.data;

        const course: Course = {
            id: responseData.id.toString(),
            route: responseData.attributes.spots.data.map(translateStrapiSpotToSpot)
        }
        return course
    }

    return {
        fetchModelCourseList,
        fetchModelCourseById
    }
}