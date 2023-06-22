import { NextPage } from "next";
import React from "react";
import Layout from "@/components/template/layout";
import Link from "next/link";
import { Course, services } from "@/features/course";
import { SpotImage, SpotList } from "@/features/spot";

type State = {
  courses: Course[];
};

const initialState: State = {
  courses: [],
};

const ModelCourseList: NextPage = () => {
  const [courses, setCourses] = React.useState(initialState.courses);

  React.useEffect(() => {
    (async () => {
      const result = await services.fetchModelCourseList();
      setCourses(result);
    })();
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
                  {course.route.map((spot) => spot!.name).join("→")}
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
