import { SpotEntity } from "@/gen/actions";

/**
 * 環境変数と観光スポットのデータから画像URLを組み立てる
 */
export const assembleSpotImageUrl = (data: SpotEntity) => {
  const url = data.attributes?.photo?.data?.attributes?.url;
  if (!url) return undefined;

  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
};
