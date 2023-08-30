import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { SpotEntity } from "@/gen/actions";
import { SpotImage } from "../SpotImage";

type SpotCardProps = {
  data: SpotEntity;
};
export const SpotCard: React.FC<SpotCardProps> = ({ data }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <SpotImage
          src={
            data.attributes?.photo?.data?.attributes?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.attributes?.photo?.data?.attributes?.url}`
              : undefined
          }
          alt={data.attributes?.name ?? "観光スポット サムネイル"}
        />
      </Card.Section>

      <Text weight={500}>{data.attributes?.name}</Text>
    </Card>
  );
};

export const SpotCardContainer = () => {
  return <></>;
};
