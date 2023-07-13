import { errorHandler } from "@/utils/fetcher/strapi";
import { Spot, SpotImage, SpotList, services } from "@/features/spot";
import { travelBrochuresSpotsStorage } from "@/utils/storage";
import Layout from "@/components/template/layout";
import Link from "@/components/ui/link";
import message from "@/components/ui/message";
import React from "react";
import type { NextPage } from "next";
import { Dropdown } from "antd";
import Headline from "@/components/module/headline";
import MyMap from "@/components/ui/map";
import { MarkerF } from "@react-google-maps/api";

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
      <Headline className="text-center">旅のしおり</Headline>
      <SpotList>
        {spots.map((spot) => {
          return (
            <li key={spot.id}>
              <SpotImage src={spot.photo} alt={spot.name} />
              <p>{spot.name}</p>
              <div className="flex justify-between">
                <Link href={`/spots/${spot.id}`}>
                  <span className="text-blue-500">詳細</span>
                </Link>
                <Dropdown
                  placement="bottomRight"
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: "削除",
                        onClick: () => handleRemoveBrochure(spot.id),
                        danger: true,
                      },
                    ],
                  }}
                >
                  <a
                    className="cursor-pointer"
                    onClick={(e) => e.preventDefault()}
                  >
                    :
                  </a>
                </Dropdown>
              </div>
            </li>
          );
        })}
      </SpotList>
      <MyMap>
        {spots.map((spot, index) => {
          // 10件まで
          if (index > 9) return;
          return (
            <MarkerF
              key={spot.id}
              position={{
                lat: spot.geometry.location.lat,
                lng: spot.geometry.location.lng,
              }}
            />
          );
        })}
      </MyMap>
    </Layout>
  );
};

export default TravelBrochure;
