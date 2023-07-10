import {
  StrapiGetEntriesResponse,
  StrapiOriginalCourse,
  errorHandler,
  fetch,
} from "@/utils/fetcher/strapi";
import { SpotImage, SpotList } from "@/features/spot";
import { useRouter } from "next/router";
import Layout from "@/components/template/layout";
import Link from "@/components/ui/link";
import message from "@/components/ui/message";
import Pagination from "@/components/ui/pagination";
import React from "react";
import type { NextPage } from "next";
import Headline from "@/components/module/headline";

type State = {
  courses: StrapiOriginalCourse[];
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
      const response = await fetch.get<
        StrapiGetEntriesResponse<StrapiOriginalCourse>
      >("/original-courses", {
        params: {
          "populate[spots][populate][0]": "photo,categories,holidayIds",
          "pagination[page]": isNaN(Number(page)) ? 1 : Number(page),
          "sort[0]": "id:desc",
        },
      });

      setCourses(response.data.data);
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
      <article>
        <Headline className="text-center">オリジナルコース一覧</Headline>
        <SpotList>
          {courses.map((course) => {
            return (
              <li key={course.id}>
                <Link href={`/courses/originals/${course.id}`}>
                  <SpotImage
                    src={
                      course.attributes.spots.data[0].attributes.photo.data
                        ?.attributes.url
                        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${course.attributes.spots.data[0].attributes.photo.data?.attributes.url}`
                        : undefined
                    }
                    alt={`オリジナルコース ${course.id}`}
                  />
                  <span>{course.attributes.name}</span>
                </Link>
              </li>
            );
          })}
        </SpotList>
        <Pagination
          className="flex justify-center"
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onChange={handlePageChange}
        />
      </article>
    </Layout>
  );
};

export default OriginalCourseList;
