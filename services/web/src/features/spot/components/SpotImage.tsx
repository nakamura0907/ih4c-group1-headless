import Image from "next/image";
import React from "react";

const DEFAULT_IMAGE = "/no-image.png";

export type SpotImageProps = {
  src?: string;
  alt: string;
  noRounded?: boolean;
};
export const SpotImage: React.FC<SpotImageProps> = ({
  src,
  alt,
  noRounded,
}) => {
  const [imageSrc, setImageSrc] = React.useState(src);
  return (
    <Image
      src={imageSrc || DEFAULT_IMAGE}
      alt={alt}
      width={1980}
      height={1150}
      sizes={"100vw"}
      className={noRounded ? "" : "rounded-sm"}
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
SpotImage.defaultProps = {
  noRounded: false,
};
