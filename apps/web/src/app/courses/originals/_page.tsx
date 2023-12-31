"use client";

import { Card } from "@/components/ui/Card";
import { Link } from "@/components/ui/Link";
import { Text } from "@/components/ui/Text";
import { TextInput } from "@/components/ui/Input";
import { notifications } from "@/components/ui/Notifications";
import { useOriginalCoursesLookupQuery } from "@/gen/actions";
import { SpotCardContainer, SpotImage } from "@/features/spots";
import { useForm } from "@/hooks/useMantine";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { searchParams } from "@/features/constants";
import { Container } from "@/components/ui/Container";
import { Flex } from "@/components/ui/Flex";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import React from "react";
import { MainContainer } from "@/components/template/MainContainer";
import { Center } from "@/components/ui/Center";
import { routes } from "@/config";

type FormValues = {
  q?: string;
};

const limit = 10;
export function Page() {
  const router = useRouter();
  const pathname = usePathname();

  const searchParamsObj = useSearchParams();
  const qSearchParam = searchParams.query.get(searchParamsObj);
  const pageSearchParam = searchParams.page.get(searchParamsObj);

  const form = useForm<FormValues>({
    initialValues: {
      q: qSearchParam,
    },
  });

  const { data, loading, error } = useOriginalCoursesLookupQuery({
    variables: {
      filters: {
        and: qSearchParam.split(/\s+/).map((value) => {
          return {
            title: {
              contains: value,
            },
          };
        }),
      },
      pagination: {
        limit,
        start: pageSearchParam - 1,
      },
    },
  });

  React.useEffect(() => {
    if (!error) return;
    notifications.show({
      message: "オリジナルコース一覧の取得に失敗しました",
      color: "red",
    });
  }, [error]);

  const handleSubmit = (values: FormValues) => {
    const query = toSearchParam({
      q: values.q,
    });
    router.push(`${pathname}?${query}`);
  };

  const handlePageChange = (page: number) => {
    const query = toSearchParam({
      page,
    });
    router.push(`${pathname}?${query}`);
  };

  const toSearchParam = (values: { q?: string; page?: number }) => {
    const q = `q=${values.q ?? qSearchParam}`;
    const query = `${q}&page=${values.page ?? pageSearchParam}`;
    return query;
  };

  if (loading || !data) return null;
  return (
    <MainContainer>
      <Container size="xs" mb="lg">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Flex>
            <TextInput
              placeholder="XXコース"
              style={{ width: "100%" }}
              {...form.getInputProps("q")}
            />
            <Button type="submit">検索</Button>
          </Flex>
        </form>
      </Container>
      <SpotCardContainer>
        {data.originalCourses?.data.map((value) => {
          const spot = value.attributes?.spots?.data[0];
          if (!spot) return null;
          return (
            <Link
              href={routes.courses.originals.slug.path(value.id ?? "-1")}
              key={value.id}
            >
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <SpotImage
                    src={
                      spot.attributes?.photo?.data?.attributes?.url
                        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${spot.attributes?.photo?.data?.attributes?.url}`
                        : undefined
                    }
                    alt={spot.attributes?.name ?? "観光スポット サムネイル"}
                  />
                </Card.Section>

                <Text weight={500}>{value.attributes?.title}</Text>
              </Card>
            </Link>
          );
        })}
      </SpotCardContainer>
      <Center mt="md">
        <Pagination
          value={pageSearchParam}
          total={data?.originalCourses?.meta.pagination.pageCount ?? 1}
          onChange={handlePageChange}
        />
      </Center>
    </MainContainer>
  );
}
