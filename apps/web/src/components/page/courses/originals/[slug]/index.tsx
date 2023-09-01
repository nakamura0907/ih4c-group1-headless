"use client";

import { MainContainer } from "@/components/template/MainContainer";
import { Center } from "@/components/ui/Center";
import { notifications } from "@/components/ui/Notifications";
import { Timeline } from "@/components/ui/Timeline";
import { Title } from "@/components/ui/Title";
import {
  OriginalCourseEntityResponse,
  QueryOriginalCourseArgs,
} from "@/gen/actions";
import { gql, useQuery } from "@apollo/client";
import React from "react";

const query = gql`
  query OriginalCourse($id: ID!) {
    originalCourse(id: $id) {
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
  originalCourse: OriginalCourseEntityResponse;
};
type OperationVariables = QueryOriginalCourseArgs;

export function Page({ params }: { params: { slug: string } }) {
  const { data, loading, error } = useQuery<TData, OperationVariables>(query, {
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
        <Title order={1}>{data.originalCourse.data?.attributes?.title}</Title>
      </Center>
      <Timeline>
        {data.originalCourse.data?.attributes?.spots?.data?.map((value) => {
          return (
            <Timeline.Item key={value.id} title={value.attributes?.name} />
          );
        })}
      </Timeline>
    </MainContainer>
  );
}