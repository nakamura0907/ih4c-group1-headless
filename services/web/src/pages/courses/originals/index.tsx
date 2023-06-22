import React from "react";
import { NextPage } from "next";
import Layout from "@/components/template/layout";
import Link from "next/link";
import { fetch } from "@/utils/fetcher/strapi";
import { translateStrapiSpotToSpot } from "@/features/spot/api/strapi";
import { SpotImage, SpotList } from "@/features/spot";
import { Course } from "@/features/course";

type State = {
  courses: Course[];
};

const initialState: State = {
  courses: [],
};

const OriginalCourseList: NextPage = () => {
  const [courses, setCourses] = React.useState(initialState.courses);

  /**
   * オリジナルコース一覧を取得する
   */
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
      <SpotList>
        {courses.map((course) => {
          return (
            <li key={course.id}>
              <Link href={`/courses/originals/${course.id}`}>
                <SpotImage
                  src="/no-image.png"
                  alt={`オリジナルコース ${course.id}`}
                />
                <span>
                  {course.route.map((spot: any) => spot!.name).join("→")}
                  （本来はオリジナルコース名）
                </span>
              </Link>
            </li>
          );
        })}
      </SpotList>
    </Layout>
  );
};

export default OriginalCourseList;
