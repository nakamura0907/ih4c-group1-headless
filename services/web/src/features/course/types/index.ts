import { Spot } from "../../spot"

export type Course = {
    id: string
    route: Spot[]
}

export type CourseApi = {
    fetchModelCourseList: () => Promise<Course[]>
    fetchModelCourseById: (id: string) => Promise<Course>
}