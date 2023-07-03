import { Course } from "@/features/course";
import { errorHandler, fetch } from "@/utils/fetcher/strapi";
import { SpotImage, SpotList } from "@/features/spot";
import { translateStrapiSpotToSpot } from "@/features/spot/api/strapi";
import { useRouter } from "next/router";
import Layout from "@/components/template/layout";
import Link from "@/components/ui/link";
import message from "@/components/ui/message";
import Pagination from "@/components/ui/pagination";
import React from "react";
import type { NextPage } from "next";

type State = {
  courses: Course[];
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
};

const initialState: State = {
  courses: [],
  pagination: {
    current: 1,
    pageSize: 25,
    total: 0,
  },
};

const OriginalCourseList: NextPage = () => {
  const router = useRouter();

  const [courses, setCourses] = React.useState(initialState.courses);
  const [pagination, setPagination] = React.useState(initialState.pagination);

  /**
   * オリジナルコース一覧を取得する
   */
  React.useEffect(() => {
    (async () => {
      if (!router.isReady) return;

      const { page } = router.query;
      const response = await fetch.get(
        "/original-courses?populate[spots][populate][0]=photo,category",
        {
          params: {
            "pagination[page]": isNaN(Number(page)) ? 1 : Number(page),
            "sort[0]": "id:desc",
          },
        }
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
      setPagination({
        current: response.data.meta.pagination.page,
        pageSize: response.data.meta.pagination.pageSize,
        total: response.data.meta.pagination.total,
      });
    })().catch((error) => {
      const msg = "オリジナルコース一覧の取得に失敗しました";
      if (errorHandler(error)) {
        message.error(msg);
        return;
      }
      if (error.response.status === 404) return;
      message.error(error.response.data.message || msg);
    });
  }, [router]);

  const handlePageChange = (page: number) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page },
      },
      undefined,
      { shallow: true }
    );
  };

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
      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onChange={handlePageChange}
      />
    </Layout>
  );
};

export default OriginalCourseList;
