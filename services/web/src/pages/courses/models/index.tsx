import { NextPage } from "next";
import React from "react";
import Layout from "../../../components/template/layout";
import Link from "next/link";
import Image from "next/image";
import { Course, services } from "../../../features/course";

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
      <ul className="grid gap-8 grid-flow-row grid-cols-[repeat(2,1fr)]">
        {courses.map((course) => {
          return (
            <li key={course.id}>
              <Link href={`/courses/models/${course.id}`}>
                <Image
                  src="/no-image.png"
                  alt={`モデルコース ${course.id}`}
                  width={1980}
                  height={1150}
                  sizes={"100vw"}
                  className="rounded-sm"
                />
                <span>
                  {course.route.map((spot) => spot!.name).join("→")}
                  （本来はモデルコース名）
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default ModelCourseList;
