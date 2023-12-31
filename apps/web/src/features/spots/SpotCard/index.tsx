import { Card } from "@/components/ui/Card";
import { SimpleGrid } from "@/components/ui/Grid";
import { Text } from "@/components/ui/Text";
import { SpotEntity } from "@/gen/actions";
import { SpotImage } from "../SpotImage";
import { assembleSpotImageUrl } from "@/helpers/strapi";

type SpotCardProps = {
  data: SpotEntity;
};

/**
 * 観光スポットカードコンポーネント
 */
export const SpotCard: React.FC<SpotCardProps> = ({ data }) => {
  const imageSrc = assembleSpotImageUrl(data);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <SpotImage
          src={imageSrc}
          alt={data.attributes?.name ?? "観光スポット サムネイル"}
        />
      </Card.Section>

      <Text weight={500}>{data.attributes?.name}</Text>
    </Card>
  );
};

/**
 * 観光スポットカードコンテナコンポーネント
 */
export const SpotCardContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <SimpleGrid
      breakpoints={[
        {
          minWidth: "xs",
          cols: 2,
        },
      ]}
    >
      {children}
    </SimpleGrid>
  );
};
