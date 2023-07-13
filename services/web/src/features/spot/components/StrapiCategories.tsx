import { Select, SelectProps } from "antd";
import React from "react";

export const categories = [
  {
    label: "すべて",
    value: "*",
  },
  {
    label: "歴史・文化",
    value: "3",
  },
  {
    label: "自然・景観",
    value: "4",
  },
  {
    label: "博物館・美術館",
    value: "2",
  },
  {
    label: "レジャー・スポーツ・体験施設",
    value: "1",
  },
  {
    label: "お土産・物産",
    value: "5",
  },
  {
    label: "宿泊",
    value: "6",
  },
];
export const defaultCategory = categories[0];

export type CategorySelectProps = SelectProps;
export const CategorySelect: React.FC<CategorySelectProps> = (props) => {
  return <Select className="w-full" options={categories} {...props} />;
};
