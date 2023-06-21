import { NextPage } from "next";
import React from "react";
import Layout from "../../components/template/layout";
import Image from "next/image";
import { useRouter } from "next/router";
import { Spot, services } from "../../features/spot";

type State = {
  spot?: Spot;
};

const initialState: State = {
  spot: undefined,
};

const SpotDetail: NextPage = () => {
  const router = useRouter();

  const [spot, setSpot] = React.useState(initialState.spot);

  React.useEffect(() => {
    (async () => {
      if (!router.isReady) return;
      const spotId = router.query.spotId;
      if (!spotId) throw new Error("spotIdがありません");

      const result = await services.fetchSpotById(spotId.toString());
      setSpot(result);
    })();
  }, [router]);

  const handleClick = () => {
    // ローカルストレージに配列として保存する
    const key = "travel-brochures-spots";
    const storedSpots = localStorage.getItem(key);

    if (storedSpots) {
      const parsedSpots = JSON.parse(storedSpots);
      if (!Array.isArray(parsedSpots)) {
        throw new Error("データが正しくありません");
      }
      if (parsedSpots.includes(router.query.spotId)) {
        return;
      }
      const newSpots = [...parsedSpots, router.query.spotId];

      localStorage.setItem(key, JSON.stringify(newSpots));
    } else {
      localStorage.setItem(key, JSON.stringify([router.query.spotId]));
    }
  };

  if (!spot) return null;

  return (
    <Layout>
      <Image
        src="/no-image.png"
        alt={spot.name}
        width={1980}
        height={1150}
        sizes={"100vw"}
      />
      <h2>{spot.name}</h2>

      <p>{spot.description}</p>

      <p>
        {spot.geometry.location.lat}
        {spot.geometry.location.lng}
      </p>

      <button onClick={handleClick}>しおりに追加</button>
    </Layout>
  );
};

export default SpotDetail;
