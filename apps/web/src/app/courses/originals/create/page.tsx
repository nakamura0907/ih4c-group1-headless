"use client";

import { SpotCard } from "@/features/spots/SpotCard";
import { SpotList, SpotListInnerProps } from "@/features/spots/SpotList";
import { SpotsSearchBox } from "@/features/spots/SpotsSearchBox";
import React from "react";

const SpotListInner: React.FC<SpotListInnerProps> = ({ data }) => {
  return (
    <ul>
      {data?.spots.data.map((value) => {
        return (
          <li key={value.id}>
            <SpotCard data={value} />
          </li>
        );
      })}
    </ul>
  );
};

export default function CoursesOriginalsCreate() {
  return (
    <article>
      <SpotsSearchBox />
      <SpotList>
        <SpotListInner />
      </SpotList>
    </article>
  );
}
