import React from "react";
import { Image } from "@/components/ui/Image";
import { localImages } from "@/config";

type SpotImageProps = {
  src?: string;
  alt: string;
};

const DEFAULT_SRC = localImages.noImage.path;

/**
 * 観光スポット画像コンポーネント
 */
export const SpotImage: React.FC<SpotImageProps> = ({ src, alt }) => {
  const [imageSrc, setImageSrc] = React.useState(src);

  const handleError = () => {
    setImageSrc(DEFAULT_SRC);
  };

  return (
    <Image
      src={imageSrc || DEFAULT_SRC}
      alt={alt}
      width={1980}
      height={1150}
      sizes={"100vw"}
      style={{
        aspectRatio: "1/1",
        objectFit: "contain",
      }}
      onError={handleError}
    />
  );
};
