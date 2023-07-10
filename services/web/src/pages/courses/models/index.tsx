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
import Headline from "@/components/module/headline";

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
      <article>
        <Headline className="text-center">モデルコース一覧</Headline>
        <SpotList>
          {courses.map((course) => {
            return (
              <li key={course.id}>
                <Link href={`/courses/models/${course.id}`}>
                  <SpotImage
                    src={
                      course.attributes.spots.data[0].attributes.photo.data
                        ?.attributes.url
                        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${course.attributes.spots.data[0].attributes.photo.data?.attributes.url}`
                        : undefined
                    }
                    alt={`モデルコース ${course.id}`}
                  />
                  <span>{course.attributes.name}</span>
                </Link>
              </li>
            );
          })}
        </SpotList>
      </article>
    </Layout>
  );
};

export default ModelCourseList;
