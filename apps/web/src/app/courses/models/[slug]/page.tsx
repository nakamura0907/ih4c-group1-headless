"use client";

import { MainContainer } from "@/components/template/MainContainer";
import { Center } from "@/components/ui/Center";
import { Link } from "@/components/ui/Link";
import { notifications } from "@/components/ui/Notifications";
import { Timeline } from "@/components/ui/Timeline";
import { Title } from "@/components/ui/Title";
import { ModelCourseEntityResponse, QueryModelCourseArgs } from "@/gen/actions";
import { gql, useQuery } from "@apollo/client";
import React from "react";

const query = gql`
  query ModelCourse($id: ID!) {
    modelCourse(id: $id) {
      data {
        attributes {
          title
          spots {
            data {
              id
              attributes {
                name
                photo {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
type TData = {
  modelCourse: ModelCourseEntityResponse;
};
type OperationVariables = QueryModelCourseArgs;

export default function CoursesModelsDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { data, loading, error } = useQuery<TData, OperationVariables>(query, {
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
        <Title order={1}>{data.modelCourse.data?.attributes?.title}</Title>
      </Center>
      <Timeline>
        {data.modelCourse.data?.attributes?.spots?.data?.map((value) => {
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
