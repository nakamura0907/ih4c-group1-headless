import type { NextPage } from "next";
import Layout from "../components/template/layout";
import { Spot, services } from "../features/spot";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type State = {
  spots: Spot[];
};

const initialState: State = {
  spots: [],
};

const Home: NextPage = () => {
  const [spots, setSpots] = React.useState(initialState.spots);

  React.useEffect(() => {
    (async () => {
      const spots = await services.fetchSpotList();
      setSpots(spots);
    })();
  }, []);

  return (
    <Layout>
      <article>
        <h2>観光スポット一覧</h2>
        <select>
          <option>カテゴリ選択</option>
        </select>
        <ul className="grid gap-8 grid-flow-row grid-cols-[repeat(2,1fr)]">
          {spots.map((spot) => (
            <li key={spot.id}>
              <Link href={`/spots/${spot.id}`}>
                <Image
                  src="/no-image.png"
                  alt={spot.name}
                  width={1980}
                  height={1150}
                  sizes={"100vw"}
                  className="rounded-sm"
                />
                <span>{spot.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div>ページネーション</div>
      </article>
    </Layout>
  );
};

export default Home;
