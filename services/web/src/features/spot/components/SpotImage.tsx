import Image from "next/image";
import React from "react";

const DEFAULT_IMAGE = "/no-image.png";

export type SpotImageProps = {
  src?: string;
  alt: string;
};
export const SpotImage: React.FC<SpotImageProps> = ({ src, alt }) => {
  const [imageSrc, setImageSrc] = React.useState(src);
  return (
    <Image
      src={imageSrc || DEFAULT_IMAGE}
      alt={alt}
      width={1980}
      height={1150}
      sizes={"100vw"}
      className="rounded-sm"
      onError={() => {
        setImageSrc(DEFAULT_IMAGE);
      }}
    />
  );
};
