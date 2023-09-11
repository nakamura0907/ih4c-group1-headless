"use client";

import { Select, SelectItem } from "@/components/ui/Select";
import { CategoriesQuery, useCategoriesQuery } from "@/gen/actions";
import { handleError } from "@/helpers/error";
import React from "react";

/**
 * カテゴリー選択コンポーネントとその現在値を返す
 */
export const useCategorySelector = (initialValue?: string) => {
  const [current, setCurrent] = React.useState<string | undefined>(undefined);
  const { data, loading, error } = useCategoriesQuery();

  const items = React.useMemo(() => {
    if (!data || loading) return [];

    const items = toDropdownItems(data);
    // 初期値がカテゴリーの値と一致する場合は初期値をセットする
    if (initialValue && items.some((item) => item.value == initialValue)) {
      setCurrent(initialValue);
    }

    return items;
  }, [data, loading, initialValue]);

  React.useEffect(() => {
    if (!error) return;
    handleError(error, "カテゴリーの取得に失敗しました");
  }, [error]);

  return {
    CategorySelector: () => (
      <CategorySelector
        items={items}
        current={current}
        setCurrent={setCurrent}
      />
    ),
    current,
  };
};

/**
 * カテゴリー選択コンポーネント
 */
const CategorySelector: React.FC<{
  items: SelectItem[];
  current: string | undefined;
  setCurrent: React.Dispatch<React.SetStateAction<string | undefined>>;
}> = ({ items, current, setCurrent }) => {
  const handleChange = (value: string | null) => {
    setCurrent(value ?? undefined);
  };

  return (
    <Select
      placeholder="カテゴリー選択なし"
      allowDeselect
      data={items}
      value={current}
      onChange={handleChange}
    />
  );
};

const toDropdownItems = (data: CategoriesQuery): SelectItem[] => {
  const categories = data.categories?.data;
  if (!categories) return [];

  return categories.map((category) => {
    return {
      value: category.id ?? "",
      label: category.attributes?.title ?? "",
    };
  });
};
