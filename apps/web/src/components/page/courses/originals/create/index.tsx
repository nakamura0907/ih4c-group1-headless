"use client";

import { useForm } from "@/hooks/useMantine";
import { TextInput } from "@/components/ui/Input";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { notifications } from "@/components/ui/Notifications";
import React from "react";
import {
  Maybe,
  MutationCreateOriginalCourseArgs,
  OriginalCourseEntityResponse,
} from "@/gen/actions";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import {
  SpotCard,
  SpotCardContainer,
  SpotList,
  SpotListInnerProps,
  SpotsSearchBox,
} from "@/features/spots";
import { MainContainer } from "@/components/template/MainContainer";
import { Flex } from "@/components/ui/Flex";

type BaseSpotListInnerProps = SpotListInnerProps & {
  onClick: (id: string) => void;
};
const SpotListInner: React.FC<BaseSpotListInnerProps> = ({ data, onClick }) => {
  const handleClick = (id?: Maybe<string>) => {
    if (!id) return;
    onClick(id);
  };

  return (
    <SpotCardContainer>
      {data?.spots.data.map((value) => {
        return (
          <div key={value.id} onClick={() => handleClick(value.id)}>
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

const mutation = gql`
  mutation CreateOriginalCourse($data: OriginalCourseInput!) {
    createOriginalCourse(data: $data) {
      data {
        id
      }
    }
  }
`;

type TData = { createOriginalCourse: OriginalCourseEntityResponse };
type OperationVariables = MutationCreateOriginalCourseArgs;
export function Page() {
  const [createOriginalCourse] = useMutation<TData, OperationVariables>(
    mutation,
  );

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
      const id = result.data?.createOriginalCourse.data?.id;
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
      <SpotsSearchBox />
      <SpotList>
        <SpotListInner onClick={handleSelectSpot} />
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
            <Button type="submit" disabled={selectedSpots.length == 0}>
              オリジナルコース作成
            </Button>
          </Flex>
        </form>
      </Container>
    </MainContainer>
  );
}