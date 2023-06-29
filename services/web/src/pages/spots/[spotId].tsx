import { Spot, services } from "@/features/spot";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "@/components/template/layout";
import React from "react";
import { travelBrochuresSpotsStorage } from "@/utils/storage";
import type { NextPage } from "next";
import { PrimaryButton } from "@/components/ui/button";

type State = {
  spot?: Spot;
};

const initialState: State = {
  spot: undefined,
};

const SpotDetail: NextPage = () => {
  const router = useRouter();
  const [spot, setSpot] = React.useState(initialState.spot);

  /**
   * 観光スポット詳細を取得する
   */
  React.useEffect(() => {
    (async () => {
      if (!router.isReady) return;
      const spotId = router.query.spotId;
      if (!spotId) throw new Error("spotIdがありません");

      const result = await services.fetchSpotById(spotId.toString());
      setSpot(result);
    })();
  }, [router]);

  /**
   * 旅のしおりにスポットを追加する
   */
  const handleAddBrochure = () => {
    travelBrochuresSpotsStorage.set(router.query.spotId!.toString());
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

      <PrimaryButton onClick={handleAddBrochure}>しおりに追加</PrimaryButton>
    </Layout>
  );
};

export default SpotDetail;
