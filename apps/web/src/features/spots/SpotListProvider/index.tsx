"use client";

import { Pagination } from "@/components/ui/Pagination";
import { notifications } from "@/components/ui/Notifications";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { searchParams } from "@/features/constants";
import {
  SpotEntityResponseCollection,
  useSpotsLookupQuery,
} from "@/gen/actions";
import { Center } from "@/components/ui/Center";
import React from "react";

type TData = {
  spots: SpotEntityResponseCollection;
};
export type SpotListResultsProps = {
  data?: TData;
};

const limit = 10;

/**
 * 観光スポットリストプロバイダコンポーネント
 */
export const SpotListProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParamsObj = useSearchParams();
  const qSearchParam = searchParams.query.get(searchParamsObj);
  const categorySearchParam = searchParams.category.get(searchParamsObj);
  const pageSearchParam = searchParams.page.get(searchParamsObj);

  const { data, loading, error } = useSpotsLookupQuery({
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
    // FIXME: URLSearchParams
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
          total={data?.spots?.meta.pagination.pageCount ?? 1}
          onChange={handlePageChange}
        />
      </Center>
    </div>
  );
};
