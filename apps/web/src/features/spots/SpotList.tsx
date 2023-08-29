"use client";

import { Pagination } from "@/components/ui/pagination";
import { notifications } from "@/components/ui/notifications";
import { gql, useQuery } from "@apollo/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { searchParams } from "../constants";
import React from "react";

/**
 * 観光スポットリストコンポーネント
 */
export const SpotList = () => {
  return (
    <ListWrapper>
      {/* リンク版 */}
      <HomeVer />
      {/* オリジナルコース作成版 */}
      <CreateVer />
    </ListWrapper>
  );
};

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
  spots: {
    data: {
      id: string;
      attributes: {
        name: string;
      };
    }[];
    meta: {
      pagination: {
        pageCount: number;
      };
    };
  };
};
type OperationVariables = {
  filters: {
    and: {
      name: {
        contains: string;
      };
    }[];
    categories?: {
      id: {
        eq: string;
      };
    };
  };
  pagination: {
    limit: number;
    start: number;
  };
};

// TODO: SpotListに移動
const ListWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
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
      <Pagination
        value={pageSearchParam}
        total={data?.spots.meta.pagination.pageCount ?? 1}
        onChange={handlePageChange}
      />
    </div>
  );
};

/**
 * ↓ childrenへのprops pass検証用
 * TOOD: 適切な配置場所に変更し、名前も変える
 */
type Props = {
  data?: TData;
};
const HomeVer: React.FC<Props> = (props) => {
  return (
    <ul>
      <li>リンクVer</li>
      {props.data?.spots.data.map((value) => {
        return <li key={value.id}>{value.attributes.name}</li>;
      })}
    </ul>
  );
};
const CreateVer: React.FC<Props> = (props) => {
  return (
    <ul>
      <li>Create Ver</li>
      {props.data?.spots.data.map((value) => {
        return <li key={value.id}>{value.attributes.name}</li>;
      })}
    </ul>
  );
};
