"use client";

import { Center } from "@/components/ui/center";
import { notifications } from "@/components/ui/notifications";
import { Timeline } from "@/components/ui/timeline";
import { Title } from "@/components/ui/title";
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
      message: "観光スポットの取得に失敗しました",
      color: "red",
    });
  }, [error]);

  if (loading || !data) return null;
  return (
    <article>
      <Center>
        <Title order={1}>{data.modelCourse.data?.attributes?.title}</Title>
      </Center>
      <Timeline>
        {data.modelCourse.data?.attributes?.spots?.data?.map((value) => {
          return (
            <Timeline.Item key={value.id} title={value.attributes?.name} />
          );
        })}
      </Timeline>
    </article>
  );
}
