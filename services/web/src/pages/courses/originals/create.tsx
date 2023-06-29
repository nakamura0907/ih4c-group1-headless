import { NextPage } from "next";
import React from "react";
import Layout from "@/components/template/layout";
import { Spot, SpotImage, SpotList, services } from "@/features/spot";
import { strapiBaseUrl, strapiToken } from "@/utils/fetcher/strapi";
import axios from "axios";
import { PrimaryButton } from "@/components/ui/button";

type State = {
  spots: Spot[];
  selectedSpots: string[];
};

const initialState: State = {
  spots: [],
  selectedSpots: [],
};

const OriginalCourseCreate: NextPage = () => {
  const [spots, setSpots] = React.useState(initialState.spots);
  const [selectedSpots, setSelectedSpots] = React.useState(
    initialState.selectedSpots
  );

  /**
   * 観光スポット一覧を取得する
   */
  React.useEffect(() => {
    (async () => {
      const spots = await services.fetchSpotList();
      setSpots(spots);
    })();
  }, []);

  /**
   * オリジナルコースに追加するスポットを選択する
   */
  const toggleSpotSelection = (spotId: string) => {
    // selectedSpotsにspotIdが含まれていれば、selectedSpotsからspotIdを削除する
    // なければ、selectedSpotsにspotIdを追加する
    const newSelectedSpots = selectedSpots.includes(spotId)
      ? selectedSpots.filter((selectedSpot) => selectedSpot != spotId)
      : [...selectedSpots, spotId];

    setSelectedSpots(newSelectedSpots);
  };

  /**
   * オリジナルコースを作成する
   */
  const handleCreateOriginalCourse = async () => {
    const url = `${strapiBaseUrl}/original-courses`;
    const response = await axios.post(
      url,
      {
        data: {
          name: "TODO: 入力フォームから取得する",
          spots: {
            connect: selectedSpots.map((spotId) => spotId),
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${strapiToken}`,
        },
      }
    );

    console.log(response);
  };

  return (
    <Layout>
      <p>デバッグ用: 選択したスポット {selectedSpots.join(",")}</p>
      <h2>オリジナルコース</h2>
      <select>
        <option>カテゴリ選択</option>
      </select>
      <SpotList>
        {spots.map((spot) => (
          <li key={spot.id} onClick={() => toggleSpotSelection(spot.id)}>
            <SpotImage src="/no-image.png" alt={spot.name} />
            <span>{spot.name}</span>
          </li>
        ))}
      </SpotList>
      <div>ページネーション</div>
      <PrimaryButton onClick={handleCreateOriginalCourse}>
        オリジナルコースの作成
      </PrimaryButton>
    </Layout>
  );
};

export default OriginalCourseCreate;
