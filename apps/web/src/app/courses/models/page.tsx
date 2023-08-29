"use client";

import { Card } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { notifications } from "@/components/ui/notifications";
import { SpotImage } from "@/features/spots/SpotImage";
import { ModelCourseEntityResponseCollection } from "@/gen/actions";
import { gql, useQuery } from "@apollo/client";
import React from "react";

const query = gql`
  query ModelCourses {
    modelCourses(sort: ["createdAt:desc"]) {
      data {
        id
        attributes {
          title
          spots(pagination: { limit: 1 }) {
            data {
              attributes {
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
  modelCourses: ModelCourseEntityResponseCollection;
};

export default function CoursesModelsPage() {
  const { data, loading, error } = useQuery<TData>(query);

  React.useEffect(() => {
    if (!error) return;
    notifications.show({
      message: "オリジナルコース一覧の取得に失敗しました",
      color: "red",
    });
  }, [error]);

  if (loading || !data) return null;
  return (
    <article>
      <ul>
        {data.modelCourses.data.map((value) => {
          const spot = value.attributes?.spots?.data[0];
          if (!spot) return null;
          return (
            <li key={value.id}>
              <Link href={`/courses/models/${value.id}`}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Card.Section>
                    <SpotImage
                      src={
                        spot.attributes?.photo?.data?.attributes?.url
                          ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${spot.attributes?.photo?.data?.attributes?.url}`
                          : undefined
                      }
                      alt={spot.attributes?.name ?? "観光スポット サムネイル"}
                    />
                  </Card.Section>

                  <Text weight={500}>{value.attributes?.title}</Text>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
