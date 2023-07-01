import { NextPage } from "next";
import React from "react";
import Layout from "@/components/template/layout";
import Link from "next/link";
import { Spot, SpotImage, SpotList, services } from "@/features/spot";
import { travelBrochuresSpotsStorage } from "@/utils/storage";
import { errorHandler } from "@/utils/fetcher/strapi";
import { message } from "antd";

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
    })().catch((error) => {
      const msg = "旅のしおりの取得に失敗しました";
      if (errorHandler(error)) {
        message.error(msg);
        return;
      }
      if (error.response.status === 404) return;
      message.error(error.response.data.message || msg);
    });
  }, []);

  /**
   * 旅のしおりからスポットを削除する
   */
  const handleRemoveBrochure = (spotId: string) => {
    travelBrochuresSpotsStorage.remove(spotId);
    setSpots(spots.filter((spot) => spot.id != spotId));
    message.success("旅のしおりから削除しました");
  };

  return (
    <Layout>
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
