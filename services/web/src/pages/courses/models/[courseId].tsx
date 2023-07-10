import { SpotImage } from "@/features/spot";
import { useRouter } from "next/router";
import {
  StrapiGetEntryResponse,
  StrapiModelCourse,
  errorHandler,
  fetch,
} from "@/utils/fetcher/strapi";
import Layout from "@/components/template/layout";
import message from "@/components/ui/message";
import React from "react";
import type { NextPage } from "next";
import Headline from "@/components/module/headline";

type State = {
  course?: StrapiModelCourse;
};

const initialState: State = {
  course: undefined,
};

const ModelCourseDetail: NextPage = () => {
  const router = useRouter();

  const [course, setCourse] = React.useState(initialState.course);

  /**
   * モデルコース詳細を取得する
   */
  React.useEffect(() => {
    (async () => {
      if (!router.isReady) return;
      const courseId = router.query.courseId;
      if (!courseId) throw new Error("courseIdがありません");

      const response = await fetch.get<
        StrapiGetEntryResponse<StrapiModelCourse>
      >(`/model-courses/${courseId}`, {
        params: {
          "populate[spots][populate][0]": "photo,categories,holidayIds",
        },
      });

      setCourse(response.data.data);
    })().catch((error) => {
      const msg = "モデルコースの取得に失敗しました";
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
        <Headline className="text-center">{course.attributes.name}</Headline>
        {course.attributes.spots.data.map((spot) => (
          <div key={spot.id}>
            <SpotImage
              src={
                spot.attributes.photo.data?.attributes.url
                  ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${spot.attributes.photo.data?.attributes.url}`
                  : undefined
              }
              alt={spot.attributes.name}
            />
            <span>{spot.attributes.name}</span>
          </div>
        ))}
      </article>
    </Layout>
  );
};

export default ModelCourseDetail;
