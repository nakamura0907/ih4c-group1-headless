"use client";

import { notifications } from "@/components/ui/notifications";
import { gql, useQuery } from "@apollo/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { searchParams } from "../constants";
import React from "react";

/**
 * 観光スポットリストコンポーネント
 */
export const SpotList = () => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParamsObj = useSearchParams();
  const qSearchParam = searchParams.query.get(searchParamsObj);
  const categorySearchParam = searchParams.category.get(searchParamsObj);
  const pageSearchParam = searchParams.page.get(searchParamsObj);

  const handlePageChange = () => {};

  return (
    <div>
      <ListWrapper>
        {/* リンク版 */}
        <HomeVer />
        {/* オリジナルコース作成版 */}
        <CreateVer />
      </ListWrapper>
      <div>pagination</div>
    </div>
  );
};

const query = gql`
  query SpotList {
    spots {
      data {
        id
        attributes {
          name
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
  };
};
const ListWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { data, loading, error } = useQuery<TData>(query);

  // Cannot update a component while rendering a different component対策
  React.useEffect(() => {
    if (!error) return;
    notifications.show({
      message: "観光スポット一覧の取得に失敗しました",
      color: "red",
    });
  }, [error]);

  if (loading) return null;
  const childrenWithProps = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child as React.JSX.Element, {
      data,
    });
  });

  return <div>{childrenWithProps}</div>;
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
