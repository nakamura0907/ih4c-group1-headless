"use client";

import { Pagination } from "@/components/ui/Pagination";
import { notifications } from "@/components/ui/Notifications";
import { gql, useQuery } from "@apollo/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { searchParams } from "../../constants";
import { QuerySpotsArgs, SpotEntityResponseCollection } from "@/gen/actions";
import React from "react";
import { Center } from "@/components/ui/Center";

const limit = 10;
const query = gql`
  query SpotList($filters: SpotFiltersInput!, $pagination: PaginationArg!) {
    spots(filters: $filters, pagination: $pagination) {
      data {
        id
        attributes {
          name
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
  spots: SpotEntityResponseCollection;
};
type OperationVariables = QuerySpotsArgs;
export type SpotListInnerProps = {
  data?: TData;
};

/**
 * 観光スポットリストコンポーネント
 */
export const SpotList: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParamsObj = useSearchParams();
  const qSearchParam = searchParams.query.get(searchParamsObj);
  const categorySearchParam = searchParams.category.get(searchParamsObj);
  const pageSearchParam = searchParams.page.get(searchParamsObj);

  const { data, loading, error } = useQuery<TData, OperationVariables>(query, {
    variables: {
      filters: {
        and: qSearchParam.split(/\s+/).map((value) => {
          return {
            name: {
              contains: value,
            },
          };
        }),
        categories: categorySearchParam
          ? {
              id: {
                eq: categorySearchParam,
              },
            }
          : undefined,
      },
      pagination: {
        limit,
        start: pageSearchParam - 1,
      },
    },
  });

  // Cannot update a component while rendering a different component対策
  React.useEffect(() => {
    if (!error) return;
    notifications.show({
      message: "観光スポット一覧の取得に失敗しました",
      color: "red",
    });
  }, [error]);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child as React.JSX.Element, {
      data,
    });
  });

  const handlePageChange = (page: number) => {
    const q = qSearchParam ? `q=${qSearchParam}` : "q=";
    const category = categorySearchParam
      ? `&category=${categorySearchParam}`
      : "";
    const query = `${q}${category}&page=${page}`;

    router.push(`${pathname}?${query}`);
  };

  if (loading) return null;
  return (
    <div>
      <div>{childrenWithProps}</div>
      <Center mt="md">
        <Pagination
          value={pageSearchParam}
          total={data?.spots.meta.pagination.pageCount ?? 1}
          onChange={handlePageChange}
        />
      </Center>
    </div>
  );
};
