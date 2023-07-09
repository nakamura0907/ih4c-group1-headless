import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  StrapiGetEntryResponse,
  StrapiModelCourse,
  StrapiOriginalCourse,
  errorHandler,
  fetch,
} from "@/utils/fetcher/strapi";
import { message } from "antd";
import Layout from "@/components/template/layout";
import { SpotImage } from "@/features/spot";

type State = {
  course?: StrapiOriginalCourse;
};

const initialState: State = {
  course: undefined,
};

const OriginalCourseDetail: NextPage = () => {
  const router = useRouter();

  const [course, setCourse] = React.useState(initialState.course);

  /**
   * オリジナルコース詳細を取得する
   */
  React.useEffect(() => {
    (async () => {
      if (!router.isReady) return;
      const courseId = router.query.courseId;
      if (!courseId) throw new Error("courseIdがありません");

      const response = await fetch.get<
        StrapiGetEntryResponse<StrapiModelCourse>
      >(`/original-courses/${courseId}`, {
        params: {
          "populate[spots][populate][0]": "photo,categories,holidayIds",
        },
      });

      setCourse(response.data.data);
    })().catch((error) => {
      const msg = "オリジナルコースの取得に失敗しました";
      if (errorHandler(error)) {
        message.error(msg);
        return;
      }
      if (error.response.status === 404) {
        router.replace("/404");
        return;
      }
      message.error(error.response.data.message || msg);
    });
  }, [router]);

  if (!course) return null;
  return (
    <Layout>
      <article>
        <h2>オリジナルコース</h2>
        <p>{course.attributes.name}</p>
        {course.attributes.spots.data.map((spot) => (
          <div key={spot.id}>
            <SpotImage
              src={spot.attributes.photo.data?.attributes.url}
              alt={spot.attributes.name}
            />
            <span>{spot.attributes.name}</span>
          </div>
        ))}
      </article>
    </Layout>
  );
};

export default OriginalCourseDetail;
