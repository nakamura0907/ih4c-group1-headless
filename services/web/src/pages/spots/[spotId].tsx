import { errorHandler } from "@/utils/fetcher/strapi";
import { message } from "antd";
import { PrimaryButton } from "@/components/ui/button";
import { Spot, services } from "@/features/spot";
import { travelBrochuresSpotsStorage } from "@/utils/storage";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "@/components/template/layout";
import React from "react";
import type { NextPage } from "next";

type State = {
  spot?: Spot;
  isAddedBrochure: boolean;
};

const initialState: State = {
  spot: undefined,
  isAddedBrochure: false,
};

const SpotDetail: NextPage = () => {
  const router = useRouter();

  const [spot, setSpot] = React.useState(initialState.spot);
  const [isAddedBrochure, setIsAddedBrochure] = React.useState(
    initialState.isAddedBrochure
  );

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
      setIsAddedBrochure(travelBrochuresSpotsStorage.has(spotId.toString()));
    })().catch((error) => {
      const msg = "観光スポットの取得に失敗しました";
      if (errorHandler(error)) {
        message.error(msg);
        return;
      }
      if (error.response.status === 404) {
        router.push("/404");
        return;
      }
      message.error(error.response.data.message || msg);
    });
  }, [router]);

  /**
   * 旅のしおりにスポットを追加・削除する
   */
  const handleToggleBrochure = () => {
    if (isAddedBrochure) {
      travelBrochuresSpotsStorage.remove(router.query.spotId!.toString());
      setIsAddedBrochure(false);
      message.success("旅のしおりから削除しました");
      return;
    }
    travelBrochuresSpotsStorage.set(router.query.spotId!.toString());
    setIsAddedBrochure(true);
    message.success("旅のしおりに追加しました");
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

      <PrimaryButton onClick={handleToggleBrochure}>
        {isAddedBrochure ? "旅のしおりから削除" : "旅のしおりに追加"}
      </PrimaryButton>
    </Layout>
  );
};

export default SpotDetail;
