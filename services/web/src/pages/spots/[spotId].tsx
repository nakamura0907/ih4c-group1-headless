import {
  fetch,
  StrapiGetEntryResponse,
  StrapiSpot,
  errorHandler,
} from "@/utils/fetcher/strapi";
import { PrimaryButton } from "@/components/ui/button";
import { SpotImage } from "@/features/spot";
import { travelBrochuresSpotsStorage } from "@/utils/storage";
import { useRouter } from "next/router";
import Layout from "@/components/template/layout";
import message from "@/components/ui/message";
import React from "react";
import type { NextPage } from "next";
import Headline from "@/components/module/headline";
import Typography from "@/components/ui/typography";

type State = {
  spot?: StrapiSpot;
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

      const response = await fetch.get<StrapiGetEntryResponse<StrapiSpot>>(
        `/spots/${spotId}`,
        {
          params: {
            populate: "photo,categories,holidayIds",
          },
        }
      );
      setSpot(response.data.data);
      setIsAddedBrochure(travelBrochuresSpotsStorage.has(spotId.toString()));
    })().catch((error) => {
      const msg = "観光スポットの取得に失敗しました";
      if (errorHandler(error)) {
        message.error(msg);
        return;
      }
      if (error.response.status === 404) {
        router.replace("/404");
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
      <SpotImage
        src={spot.attributes.photo.data?.attributes.url}
        alt={spot.attributes.name}
        noRounded
      />

      <Typography className="text-base">
        <Headline className="!my-10 text-center">
          <span className="leading-[3.5rem] pb-1 border-b-4 border-black">
            {spot.attributes.name}
          </span>
        </Headline>

        <Typography.Paragraph>
          {spot.attributes.description}
        </Typography.Paragraph>

        <Typography.Paragraph>
          <div>
            <Typography.Text className="mr-1">
              &#12306;{spot.attributes.postCode}
            </Typography.Text>
            <Typography.Text>{spot.attributes.address}</Typography.Text>
          </div>
          <div>
            <Typography.Text className="mr-1">お問い合わせ先:</Typography.Text>
            <Typography.Text>{spot.attributes.contact}</Typography.Text>
          </div>
        </Typography.Paragraph>

        <Typography.Paragraph>
          <div>
            <Typography.Text className="mr-1">営業日:</Typography.Text>
            <Typography.Text>{spot.attributes.businessHours}</Typography.Text>
          </div>
          <div>
            <Typography.Text className="mr-1">定休日:</Typography.Text>
            <Typography.Text>
              {spot.attributes.holidayIds.data.map((holiday, index) => {
                return index === 0
                  ? holiday.attributes.name
                  : `, ${holiday.attributes.name}`;
              })}
            </Typography.Text>
          </div>
        </Typography.Paragraph>
      </Typography>

      <PrimaryButton
        className="flex mx-auto"
        size="large"
        onClick={handleToggleBrochure}
      >
        {isAddedBrochure ? "旅のしおりから削除" : "旅のしおりに追加"}
      </PrimaryButton>
    </Layout>
  );
};

export default SpotDetail;
