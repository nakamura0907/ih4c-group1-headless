"use client";

import { notifications } from "@/components/ui/notifications";
import { Select } from "@/components/ui/select";
import { gql, useQuery } from "@apollo/client";
import React from "react"

const query = gql`query Categories {
  categories {
    data {
      id
      attributes {
        title
      }
    }
  }
}`;

type TData = {
  categories: {
    data: {
      id: string;
      attributes: {
        title: string;
      }
    }[]
  }
}

/**
 * カテゴリー一覧フック
 * 
 * カテゴリー一覧のコンポーネントと現在選択しているカテゴリーを返す
 */
export const useCategorySelect = (initialValue?: string) => {
    const [current, setCurrent] = React.useState<string | undefined>(undefined)
    const { data, loading, error } = useQuery<TData>(query)

    const items = React.useMemo(() => {
      if (!data || loading) return [];

      const items = toSelectItems(data);
      if (initialValue && items.some((item) => item.value == initialValue)) setCurrent(initialValue)

      return items;
    }, [data, loading, initialValue])

    // Cannot update a component while rendering a different component対策
    React.useEffect(() => {
      if (!error) return;
      notifications.show({
        message: "カテゴリー一覧の取得に失敗しました",
        color: "red"
      })
    }, [error])

    const CategorySelect = () => {
        return (
            <Select placeholder="カテゴリー選択なし" allowDeselect data={items} value={current} onChange={(value) => {
                setCurrent(value ?? undefined)
            }} />
        )
    }

    return {
        CategorySelect,
        current,
    }
}

const toSelectItems = (data: TData) => {
  return data.categories.data.map((category) => {
    const { id, attributes } = category;
    return {
      value: id,
      label: attributes.title
    }
  })
}