import { errorHandler } from "@/utils/fetcher/strapi";
import { PrimaryButton } from "@/components/ui/button";
import message from "@/components/ui/message";
import { Spot, SpotImage, services } from "@/features/spot";
import { travelBrochuresSpotsStorage } from "@/utils/storage";
import { useRouter } from "next/router";
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
    if (
      travelBrochuresSpotsStorage.count() >= travelBrochuresSpotsStorage.maxSize
    ) {
      message.info(
        `旅のしおりは${travelBrochuresSpotsStorage.maxSize}件まで登録できます`
      );
      return;
    }

    travelBrochuresSpotsStorage.set(router.query.spotId!.toString());
    setIsAddedBrochure(true);
    message.success("旅のしおりに追加しました");
  };

  if (!spot) return null;
  return (
    <Layout>
      <SpotImage src={spot.photo} alt={spot.name} noRounded />
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
