"use client";

import React from "react";
import { useForm } from "@/hooks/useMantine";
import { TextInput } from "@/components/ui/Input";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { notifications } from "@/components/ui/Notifications";
import { Maybe, useCreateOriginalCourseMutation } from "@/gen/actions";
import { useRouter } from "next/navigation";
import {
  SpotCard,
  SpotCardContainer,
  SpotList,
  SpotListInnerProps,
  SpotsSearchForm,
} from "@/features/spots";
import { MainContainer } from "@/components/template/MainContainer";
import { Flex } from "@/components/ui/Flex";
import { Badge } from "@/components/ui/Badge";

type BaseSpotListInnerProps = SpotListInnerProps & {
  onClick: (id: string) => void;
  selectedSpots: string[];
};
const SpotListInner: React.FC<BaseSpotListInnerProps> = ({
  data,
  onClick,
  selectedSpots,
}) => {
  const handleClick = (id?: Maybe<string>) => {
    if (!id) return;
    onClick(id);
  };

  return (
    <SpotCardContainer>
      {data?.spots.data.map((value) => {
        const index = selectedSpots.indexOf(value.id ?? "-1");
        return (
          <div
            key={value.id}
            onClick={() => handleClick(value.id)}
            className="relative"
          >
            {index != -1 && (
              <Badge size="lg" className="absolute right-0 top-0 z-50">
                {index + 1}
              </Badge>
            )}
            <SpotCard data={value} />
          </div>
        );
      })}
    </SpotCardContainer>
  );
};

type State = {
  selectedSpots: string[];
};
const initialState: State = {
  selectedSpots: [],
};
type FormValues = {
  name: string;
};

export function Page() {
  const [createOriginalCourse, { loading }] = useCreateOriginalCourseMutation();

  const router = useRouter();
  const [selectedSpots, setSelectedSpots] = React.useState(
    initialState.selectedSpots,
  );
  const form = useForm<FormValues>({
    initialValues: {
      name: "",
    },
  });

  const handleSelectSpot = (id: string) => {
    if (selectedSpots.includes(id)) {
      setSelectedSpots(selectedSpots.filter((value) => value != id));
    } else {
      const maxLength = 5;
      if (selectedSpots.length >= maxLength) {
        notifications.show({
          message: `観光スポットは${maxLength}つまで選択できます`,
          color: "yellow",
        });
        return;
      }

      setSelectedSpots([...selectedSpots, id]);
    }
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      const result = await createOriginalCourse({
        variables: {
          data: {
            title: values.name,
            spots: selectedSpots,
          },
        },
      });
      const id = result.data?.createOriginalCourse?.data?.id;
      if (!id) throw new Error("IDが取得できませんでした");

      router.push(`/courses/originals/${id}`);
    } catch (error) {
      notifications.show({
        message: "オリジナルコースの作成に失敗しました",
        color: "red",
      });
    }
  };

  return (
    <MainContainer>
      <SpotsSearchForm />
      <SpotList>
        <SpotListInner
          onClick={handleSelectSpot}
          selectedSpots={selectedSpots}
        />
      </SpotList>
      <Container size="xs">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            withAsterisk
            label="コース名"
            placeholder="XXコース"
            mb="md"
            {...form.getInputProps("name")}
          />
          <Flex justify="end">
            <Button
              type="submit"
              disabled={selectedSpots.length == 0}
              loading={loading}
            >
              オリジナルコース作成
            </Button>
          </Flex>
        </form>
      </Container>
    </MainContainer>
  );
}
