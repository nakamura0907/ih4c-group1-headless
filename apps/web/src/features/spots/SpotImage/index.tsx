import React from "react";
import { Image } from "@/components/ui/Image";
import { localImages } from "@/config";

type SpotImageProps = {
  src?: string;
  alt: string;
};
const DEFAULT_IMAGE = localImages.noImage.path;
export const SpotImage: React.FC<SpotImageProps> = ({ src, alt }) => {
  const [imageSrc, setImageSrc] = React.useState(src);
  return (
    <Image
      src={imageSrc || DEFAULT_IMAGE}
      alt={alt}
      width={1980}
      height={1150}
      sizes={"100vw"}
      style={{
        aspectRatio: "1/1",
        objectFit: "contain",
      }}
      onError={() => {
        setImageSrc(DEFAULT_IMAGE);
      }}
    />
  );
};
