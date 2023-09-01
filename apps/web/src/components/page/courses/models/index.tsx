"use client";

import { Card } from "@/components/ui/Card";
import { Link } from "@/components/ui/Link";
import { Text } from "@/components/ui/Text";
import { notifications } from "@/components/ui/Notifications";
import { MainContainer } from "@/components/template/MainContainer";
import { SpotCardContainer, SpotImage } from "@/features/spots";
import { ModelCourseEntityResponseCollection } from "@/gen/actions";
import { gql, useQuery } from "@apollo/client";
import React from "react";
import { routes } from "@/config";

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

export function Page() {
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
    <MainContainer>
      <SpotCardContainer>
        {data.modelCourses.data.map((value) => {
          const spot = value.attributes?.spots?.data[0];
          if (!spot) return null;
          return (
            <Link
              href={routes.courses.models.slug.path(value.id ?? "-1")}
              key={value.id}
            >
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
          );
        })}
      </SpotCardContainer>
    </MainContainer>
  );
}
