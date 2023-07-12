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
import Headline from "@/components/module/headline";
import MyMap, { MyDirection } from "@/components/ui/map";
import { MarkerF } from "@react-google-maps/api";

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

  const renderRoute = (course: StrapiModelCourse) => {
    const length = course.attributes.spots.data.length;
    if (length == 1) {
      return (
        <MarkerF
          position={{
            lat: course.attributes.spots.data[0].attributes.latitude,
            lng: course.attributes.spots.data[0].attributes.longitude,
          }}
          label={{
            text: "1",
          }}
        />
      );
    }

    const origin = {
      lat: course.attributes.spots.data[0].attributes.latitude,
      lng: course.attributes.spots.data[0].attributes.longitude,
    };
    const destination = {
      lat: course.attributes.spots.data[course.attributes.spots.data.length - 1]
        .attributes.latitude,
      lng: course.attributes.spots.data[course.attributes.spots.data.length - 1]
        .attributes.longitude,
    };

    const waypoints =
      course.attributes.spots.data.length == 2
        ? undefined
        : course.attributes.spots.data
            .slice(1, course.attributes.spots.data.length - 1)
            .map((spot) => {
              return {
                location: {
                  lat: spot.attributes.latitude,
                  lng: spot.attributes.longitude,
                },
                stopover: true,
              };
            });

    return (
      <MyDirection
        options={{
          origin: origin,
          destination: destination,
          waypoints,
          travelMode: "DRIVING" as any,
          optimizeWaypoints: false,
        }}
      />
    );
  };

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
                <div className="rounded-xl shadow-box w-24 h-24 flex items-center">
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

        <MyMap>{renderRoute(course)}</MyMap>
      </div>
    </Layout>
  );
};

export default OriginalCourseDetail;
