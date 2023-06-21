import axios from "axios";
import { Course, CourseApi } from "../types";
import { StrapiGetEntriesResponse, StrapiModelCourse, strapiBaseUrl, strapiToken } from "../../../utils/fetcher/strapi";
import { translateStrapiSpotToSpot } from "../../spot/api/external";

type FetchModelCourseByIdResponse = {
    course: Course
}

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
        const url = `model-courses/${id}?populate=*`;

        const response = await axios.get<FetchModelCourseByIdResponse>(url);
        return response.data.course;
    }

    return {
        fetchModelCourseList,
        fetchModelCourseById
    }
}