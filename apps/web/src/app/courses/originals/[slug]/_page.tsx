"use client";

import { MainContainer } from "@/components/template/MainContainer";
import { Center } from "@/components/ui/Center";
import { notifications } from "@/components/ui/Notifications";
import { Timeline } from "@/components/ui/Timeline";
import { Title } from "@/components/ui/Title";
import { useFetchOriginalCourseByIdQuery } from "@/gen/actions";
import React from "react";

export function Page({ params }: { params: { slug: string } }) {
  const { data, loading, error } = useFetchOriginalCourseByIdQuery({
    variables: {
      id: params.slug,
    },
  });

  React.useEffect(() => {
    if (!error) return;
    notifications.show({
      message: "オリジナルコースの取得に失敗しました",
      color: "red",
    });
  }, [error]);

  if (loading || !data) return null;

  return (
    <MainContainer>
      <Center mb="lg">
        <Title order={1}>{data.originalCourse?.data?.attributes?.title}</Title>
      </Center>
      <Timeline>
        {data.originalCourse?.data?.attributes?.spots?.data?.map((value) => {
          return (
            <Timeline.Item key={value.id} title={value.attributes?.name} />
          );
        })}
      </Timeline>
    </MainContainer>
  );
}
