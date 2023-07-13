import {
  StrapiGetEntriesResponse,
  StrapiOriginalCourse,
  errorHandler,
  fetch,
} from "@/utils/fetcher/strapi";
import { SpotImage, SpotList } from "@/features/spot";
import { useRouter } from "next/router";
import FormContainer from "@/components/module/form-container";
import Headline from "@/components/module/headline";
import Input from "@/components/ui/input";
import Layout from "@/components/template/layout";
import Link from "@/components/ui/link";
import message from "@/components/ui/message";
import Pagination from "@/components/ui/pagination";
import React from "react";
import type { NextPage } from "next";

type State = {
  courses: StrapiOriginalCourse[];
  name: string;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
};

const initialState: State = {
  courses: [],
  name: "",
  pagination: {
    current: 1,
    pageSize: 25,
    total: 0,
  },
};

const OriginalCourseList: NextPage = () => {
  const router = useRouter();

  const [courses, setCourses] = React.useState(initialState.courses);
  const [name, setName] = React.useState(initialState.name);
  const [pagination, setPagination] = React.useState(initialState.pagination);

  /**
   * オリジナルコース一覧を取得する
   */
  React.useEffect(() => {
    (async () => {
      if (!router.isReady) return;

      const { page, name } = router.query;
      const response = await fetch.get<
        StrapiGetEntriesResponse<StrapiOriginalCourse>
      >("/original-courses", {
        params: {
          "populate[spots][populate][0]": "photo,categories,holidayIds",
          "pagination[page]": isNaN(Number(page)) ? 1 : Number(page),
          "sort[0]": "id:desc",
          filters: {
            name:
              name === initialState.name
                ? undefined
                : {
                    $contains: name,
                  },
          },
        },
      });

      setCourses(response.data.data);
      setPagination({
        current: response.data.meta.pagination.page,
        pageSize: response.data.meta.pagination.pageSize,
        total: response.data.meta.pagination.total,
      });
      if (name) setName(String(name));
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
        <FormContainer className="mb-5">
          <Input.Search
            placeholder="検索キーワードを入力してください"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            onSearch={(value) => {
              router.push(
                {
                  pathname: router.pathname,
                  query: { ...router.query, name: value, page: 1 },
                },
                undefined,
                { shallow: true }
              );
            }}
          />
        </FormContainer>
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
