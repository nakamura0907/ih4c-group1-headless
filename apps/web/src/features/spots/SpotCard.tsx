import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { SpotEntity } from "@/gen/actions";

type SpotCardProps = {
  data: SpotEntity;
};
export const SpotCard: React.FC<SpotCardProps> = ({ data }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={"/no-image.png"}
          fill
          alt={data.attributes?.name ?? "観光スポット サムネイル"}
          className="!relative"
        />
      </Card.Section>

      <Text weight={500}>{data.attributes?.name}</Text>
    </Card>
  );
};

export const SpotCardContainer = () => {
  return <></>;
};
