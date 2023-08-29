"use client";

import { SpotCard } from "@/features/spots/SpotCard";
import { SpotList, SpotListInnerProps } from "@/features/spots/SpotList";
import { SpotsSearchBox } from "@/features/spots/SpotsSearchBox";
import { Link } from "@/components/ui/link";
import React from "react";

const SpotListInner: React.FC<SpotListInnerProps> = ({ data }) => {
  return (
    <ul>
      {data?.spots.data.map((value) => {
        return (
          <li key={value.id}>
            <Link href={`/spots/${value.id}`}>
              <SpotCard data={value} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export function Page() {
  return (
    <article>
      <SpotsSearchBox />
      <SpotList>
        <SpotListInner />
      </SpotList>
    </article>
  );
}
