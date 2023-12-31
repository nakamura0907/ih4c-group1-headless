"use client";

import { MainContainer } from "@/components/template/MainContainer";
import { Center } from "@/components/ui/Center";
import { notifications } from "@/components/ui/Notifications";
import { Text } from "@/components/ui/Text";
import { Title } from "@/components/ui/Title";
import { SpotImage } from "@/features/spots";
import { useFetchSpotByIdQuery } from "@/gen/actions";
import React from "react";

export function Page({ params }: { params: { slug: string } }) {
  const { data, loading, error } = useFetchSpotByIdQuery({
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
    <MainContainer>
      <Center mb="lg">
        <Title order={1}>{data.spot?.data?.attributes?.name}</Title>
      </Center>
      {data.spot?.data?.attributes?.photo?.data?.attributes?.url && (
        <SpotImage
          src={
            data.spot?.data?.attributes?.photo?.data?.attributes?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.spot?.data?.attributes?.photo?.data?.attributes?.url}`
              : undefined
          }
          alt={data.spot?.data?.attributes?.name ?? "観光スポット サムネイル"}
        />
      )}
      <Text
        mt={
          data.spot?.data?.attributes?.photo?.data?.attributes?.url
            ? "lg"
            : undefined
        }
      >
        {data.spot?.data?.attributes?.description}
      </Text>
    </MainContainer>
  );
}
