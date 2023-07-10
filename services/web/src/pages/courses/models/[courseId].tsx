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
      <div className="bg-white max-w-xl mx-auto my-0 py-4 block">
        <article className="w-11/12 mx-auto my-0">
          <Headline className="text-center text-2xl">
            {course.attributes.name}
          </Headline>
          <div className="w-24 text-center mt-12">
            <p className="py-2.5 px-0 bg-start rounded-xl shadow-box">
              スタート!
            </p>
            <div className="w-5 h-20 mx-auto my-0 bg-start"></div>
          </div>
          {course.attributes.spots.data.map((spot) => (
            <div key={spot.id} className="flex w-full">
              <section className="w-24 text-center">
                <div className="rounded-xl shadow-box w-24 h-24">
                  <SpotImage
                    src={
                      spot.attributes.photo.data?.attributes.url
                        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${spot.attributes.photo.data?.attributes.url}`
                        : undefined
                    }
                    alt={spot.attributes.name}
                  />
                </div>
                <div className="w-5 h-20 mx-auto my-0 bg-start"></div>
              </section>

              <div className="w-3/4 flex justify-around py-6">
                <span className="text-center">{spot.attributes.name}</span>
              </div>
            </div>
          ))}
          <div className="w-24 text-center mb-12 block items-end">
            <p className="py-2.5 px-0 bg-start rounded-xl shadow-box">
              ゴール！
            </p>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default ModelCourseDetail;
