"use client";

import { Center } from "@/components/ui/Center";
import { notifications } from "@/components/ui/Notifications";
import { Text } from "@/components/ui/Text";
import { Title } from "@/components/ui/Title";
import { SpotImage } from "@/features/spots";
import { QuerySpotArgs, SpotEntityResponse } from "@/gen/actions";
import { gql, useQuery } from "@apollo/client";
import React from "react";

const query = gql`
  query Spot($id: ID!) {
    spot(id: $id) {
      data {
        attributes {
          name
          description
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
`;
type TData = {
  spot: SpotEntityResponse;
};
type OperationVariables = QuerySpotArgs;

export default function SpotsDetail({ params }: { params: { slug: string } }) {
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
        <Title order={1}>{data.spot.data?.attributes?.name}</Title>
      </Center>
      {data.spot.data?.attributes?.photo?.data?.attributes?.url && (
        <SpotImage
          src={
            data.spot.data?.attributes?.photo?.data?.attributes?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.spot.data?.attributes?.photo?.data?.attributes?.url}`
              : undefined
          }
          alt={data.spot.data?.attributes?.name ?? "観光スポット サムネイル"}
        />
      )}
      <Text>{data.spot.data?.attributes?.description}</Text>
    </article>
  );
}
