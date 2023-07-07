import {
  fetch,
  StrapiModelCourse,
  errorHandler,
  StrapiGetEntriesResponse,
} from "@/utils/fetcher/strapi";
import { SpotImage, SpotList } from "@/features/spot";
import Layout from "@/components/template/layout";
import Link from "@/components/ui/link";
import message from "@/components/ui/message";
import React from "react";
import type { NextPage } from "next";

type State = {
  courses: StrapiModelCourse[];
};

const initialState: State = {
  courses: [],
};

const ModelCourseList: NextPage = () => {
  const [courses, setCourses] = React.useState(initialState.courses);

  /**
   * モデルコース一覧を取得する
   */
  React.useEffect(() => {
    (async () => {
      const response = await fetch.get<
        StrapiGetEntriesResponse<StrapiModelCourse>
      >("/model-courses", {
        params: {
          "populate[spots][populate][0]": "photo,categories,holidayIds",
        },
      });
      setCourses(response.data.data);
    })().catch((error) => {
      const msg = "モデルコース一覧の取得に失敗しました";
      if (errorHandler(error)) {
        message.error(msg);
        return;
      }
      message.error(error.response.data.message || msg);
    });
  }, []);

  return (
    <Layout>
      <h2>モデルコース一覧</h2>
      <SpotList>
        {courses.map((course) => {
          return (
            <li key={course.id}>
              <Link href={`/courses/models/${course.id}`}>
                <SpotImage
                  src={
                    course.attributes.spots.data[0].attributes.photo.data
                      ?.attributes.url
                  }
                  alt={`モデルコース ${course.id}`}
                />
                <span>{course.attributes.name}</span>
              </Link>
            </li>
          );
        })}
      </SpotList>
    </Layout>
  );
};

export default ModelCourseList;
