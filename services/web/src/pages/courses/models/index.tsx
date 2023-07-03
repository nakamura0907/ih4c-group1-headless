import { Course, services } from "@/features/course";
import { errorHandler } from "@/utils/fetcher/strapi";
import { SpotImage, SpotList } from "@/features/spot";
import Layout from "@/components/template/layout";
import Link from "@/components/ui/link";
import message from "@/components/ui/message";
import React from "react";
import type { NextPage } from "next";

type State = {
  courses: Course[];
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
      const result = await services.fetchModelCourseList();
      setCourses(result);
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
                  src="/no-image.png"
                  alt={`モデルコース ${course.id}`}
                />
                <span>
                  {course.route.map((spot) => spot.name).join("→")}
                  （本来はモデルコース名）
                </span>
              </Link>
            </li>
          );
        })}
      </SpotList>
    </Layout>
  );
};

export default ModelCourseList;
