"use client";

import { MainContainer } from "@/components/template/MainContainer";
import { Center } from "@/components/ui/Center";
import { Link } from "@/components/ui/Link";
import { notifications } from "@/components/ui/Notifications";
import { Timeline } from "@/components/ui/Timeline";
import { Title } from "@/components/ui/Title";
import { useFetchModelCourseByIdQuery } from "@/gen/actions";
import React from "react";

export function Page({ params }: { params: { slug: string } }) {
  const { data, loading, error } = useFetchModelCourseByIdQuery({
    variables: {
      id: params.slug,
    },
  });

  React.useEffect(() => {
    if (!error) return;
    notifications.show({
      message: "モデルコースの取得に失敗しました",
      color: "red",
    });
  }, [error]);

  if (loading || !data) return null;
  return (
    <MainContainer>
      <Center mb="lg">
        <Title order={1}>{data.modelCourse?.data?.attributes?.title}</Title>
      </Center>
      <Timeline>
        {data.modelCourse?.data?.attributes?.spots?.data?.map((value) => {
          return (
            <Timeline.Item
              key={value.id}
              title={
                <Link href={`/spots/${value.id}`}>
                  {value.attributes?.name}
                </Link>
              }
            />
          );
        })}
      </Timeline>
    </MainContainer>
  );
}
