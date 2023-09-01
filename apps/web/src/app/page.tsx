"use client";

import { Link } from "@/components/ui/Link";
import {
  SpotCard,
  SpotList,
  SpotListInnerProps,
  SpotsSearchBox,
} from "@/features/spots";
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

export default function Home() {
  return (
    <article>
      <SpotsSearchBox />
      <SpotList>
        <SpotListInner />
      </SpotList>
    </article>
  );
}
