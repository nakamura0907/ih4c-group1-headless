import { Spot, SpotImage, SpotList, services } from "@/features/spot";
import Layout from "@/components/template/layout";
import Link from "next/link";
import React from "react";
import type { NextPage } from "next";

type State = {
  spots: Spot[];
};

const initialState: State = {
  spots: [],
};

const Home: NextPage = () => {
  const [spots, setSpots] = React.useState(initialState.spots);

  /**
   * 観光スポット一覧を取得する
   */
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
        <SpotList>
          {spots.map((spot) => (
            <li key={spot.id}>
              <Link href={`/spots/${spot.id}`}>
                <SpotImage src={spot.photo} alt={spot.name} />
                <span>{spot.name}</span>
              </Link>
            </li>
          ))}
        </SpotList>
        <div>ページネーション</div>
      </article>
    </Layout>
  );
};

export default Home;
