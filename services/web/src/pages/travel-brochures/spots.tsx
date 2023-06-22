import { NextPage } from "next";
import React from "react";
import Layout from "@/components/template/layout";
import Link from "next/link";
import { Spot, SpotImage, SpotList, services } from "@/features/spot";
import { travelBrochuresSpotsStorage } from "@/utils/storage";

type State = {
  spots: Spot[];
};

const initialState: State = {
  spots: [],
};

const TravelBrochure: NextPage = () => {
  const [spots, setSpots] = React.useState(initialState.spots);

  /**
   * 旅のしおりに登録されている観光スポット一覧を取得する
   */
  React.useEffect(() => {
    (async () => {
      const spotIds = travelBrochuresSpotsStorage.get();
      if (spotIds.length === 0) return;

      const result = await services.fetchSpotList({
        filter: {
          id: spotIds,
        },
      });
      setSpots(result);
    })();
  }, []);

  /**
   * 旅のしおりからスポットを削除する
   */
  const handleRemoveBrochure = (spotId: string) => {
    travelBrochuresSpotsStorage.remove(spotId);
    setSpots(spots.filter((spot) => spot.id != spotId));
  };

  return (
    <Layout>
      <select>
        <option>すべてのスポット</option>
      </select>
      <SpotList>
        {spots.map((spot) => {
          return (
            <li key={spot.id}>
              <SpotImage src={spot.photo} alt={spot.name} />
              <p>{spot.name}</p>
              <div className="flex">
                <Link href={`/spots/${spot.id}`}>
                  <span className="text-blue-500">詳細</span>
                </Link>
                <button onClick={() => handleRemoveBrochure(spot.id)}>
                  削除
                </button>
              </div>
            </li>
          );
        })}
      </SpotList>
    </Layout>
  );
};

export default TravelBrochure;
