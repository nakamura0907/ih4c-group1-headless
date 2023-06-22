import Image from "next/image";
import React from "react";

export type SpotImageProps = {
  src: string;
  alt: string;
};
export const SpotImage: React.FC<SpotImageProps> = ({ src, alt }) => {
  const [imageSrc, setImageSrc] = React.useState(src);
  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={1980}
      height={1150}
      sizes={"100vw"}
      className="rounded-sm"
      onError={() => {
        setImageSrc("/no-image.png");
      }}
    />
  );
};
