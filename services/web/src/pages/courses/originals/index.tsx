import React from "react";
import { NextPage } from "next";
import Layout from "../../../components/template/layout";
import Link from "next/link";
import Image from "next/image";
import { fetch } from "../../../utils/fetcher/strapi";
import { translateStrapiSpotToSpot } from "../../../features/spot/api/external";

type State = {
  courses: any[];
};

const initialState: State = {
  courses: [],
};

const OriginalCourseList: NextPage = () => {
  const [courses, setCourses] = React.useState(initialState.courses);

  React.useEffect(() => {
    (async () => {
      const response = await fetch.get(
        "/original-courses?populate[spots][populate][0]=photo,category"
      );
      const courses = response.data.data.map((course: any) => {
        const route = course.attributes.spots.data.map(
          translateStrapiSpotToSpot
        );

        return {
          id: course.id.toString(),
          route,
        };
      });
      setCourses(courses);
    })();
  }, []);

  return (
    <Layout>
      <h2>オリジナルコース一覧</h2>
      <ul className="grid gap-8 grid-flow-row grid-cols-[repeat(2,1fr)]">
        {courses.map((course) => {
          return (
            <li key={course.id}>
              <Link href={`/courses/originals/${course.id}`}>
                <Image
                  src="/no-image.png"
                  alt={`オリジナルコース ${course.id}`}
                  width={1980}
                  height={1150}
                  sizes={"100vw"}
                  className="rounded-sm"
                />
                <span>
                  {course.route.map((spot: any) => spot!.name).join("→")}
                  （本来はオリジナルコース名）
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default OriginalCourseList;
