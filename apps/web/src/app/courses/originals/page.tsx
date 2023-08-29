"use client";

import { Card } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { TextInput } from "@/components/ui/input";
import { notifications } from "@/components/ui/notifications";
import {
  OriginalCourseEntityResponseCollection,
  QueryOriginalCoursesArgs,
} from "@/gen/actions";
import { gql, useQuery } from "@apollo/client";
import React from "react";
import { SpotImage } from "@/features/spots/SpotImage";
import { useForm } from "@/hooks/useMantine";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { searchParams } from "@/features/constants";
import { Container } from "@/components/ui/container";
import { Flex } from "@/components/ui/flex";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";

const query = gql`
  query OriginalCourses(
    $filters: OriginalCourseFiltersInput!
    $pagination: PaginationArg!
  ) {
    originalCourses(
      filters: $filters
      sort: ["createdAt:desc"]
      pagination: $pagination
    ) {
      data {
        id
        attributes {
          title
          spots(pagination: { limit: 1 }) {
            data {
              attributes {
                photo {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
      meta {
        pagination {
          pageCount
        }
      }
    }
  }
`;
type TData = {
  originalCourses: OriginalCourseEntityResponseCollection;
};
type OperationVariables = QueryOriginalCoursesArgs;

type FormValues = {
  q?: string;
};

const limit = 10;
export default function CoursesOriginalsPage() {
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

  const { data, loading, error } = useQuery<TData, OperationVariables>(query, {
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
    <article>
      <Container size="xs">
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
      <ul>
        {data.originalCourses.data.map((value) => {
          const spot = value.attributes?.spots?.data[0];
          if (!spot) return null;
          return (
            <li key={value.id}>
              <Link href={`/courses/originals/${value.id}`}>
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
            </li>
          );
        })}
      </ul>
      <Pagination
        value={pageSearchParam}
        total={data?.originalCourses.meta.pagination.pageCount ?? 1}
        onChange={handlePageChange}
      />
    </article>
  );
}
