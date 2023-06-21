import { NextPage } from "next";
import React from "react";
import Layout from "../../../components/template/layout";
import Image from "next/image";
import { Spot, services } from "../../../features/spot";
import { strapiBaseUrl, strapiToken } from "../../../utils/fetcher/strapi";
import axios from "axios";

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

  React.useEffect(() => {
    (async () => {
      const spots = await services.fetchSpotList();
      setSpots(spots);
    })();
  }, []);

  const toggleSpotSelection = (spotId: string) => {
    // selectedSpotsにspotIdが含まれていれば、selectedSpotsからspotIdを削除する
    // なければ、selectedSpotsにspotIdを追加する
    const newSelectedSpots = selectedSpots.includes(spotId)
      ? selectedSpots.filter((selectedSpot) => selectedSpot != spotId)
      : [...selectedSpots, spotId];

    setSelectedSpots(newSelectedSpots);
  };

  const handleClick = async () => {
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
      <ul className="grid gap-8 grid-flow-row grid-cols-[repeat(2,1fr)]">
        {spots.map((spot) => (
          <li key={spot.id} onClick={() => toggleSpotSelection(spot.id)}>
            <Image
              src="/no-image.png"
              alt={spot.name}
              width={1980}
              height={1150}
              sizes={"100vw"}
              className="rounded-sm"
            />
            <span>{spot.name}</span>
          </li>
        ))}
      </ul>
      <div>ページネーション</div>
      <button onClick={handleClick}>オリジナルコースの作成</button>
    </Layout>
  );
};

export default OriginalCourseCreate;
