"use client";

import { MainContainer } from "@/components/template/MainContainer";
import { Link } from "@/components/ui/Link";
import { routes } from "@/config";
import {
  SpotCard,
  SpotCardContainer,
  SpotList,
  SpotListInnerProps,
  SpotsSearchBox,
} from "@/features/spots";
import React from "react";

const SpotListInner: React.FC<SpotListInnerProps> = ({ data }) => {
  return (
    <SpotCardContainer>
      {data?.spots.data.map((value) => {
        return (
          <Link href={routes.spots.slug.path(value.id ?? "-1")} key={value.id}>
            <SpotCard data={value} />
          </Link>
        );
      })}
    </SpotCardContainer>
  );
};

export function Page() {
  return (
    <MainContainer>
      <SpotsSearchBox />
      <SpotList>
        <SpotListInner />
      </SpotList>
    </MainContainer>
  );
}
