"use client";

import { Select } from "@/components/ui/select";
import { gql, useSuspenseQuery } from "@apollo/client";
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

export const useCategorySelect = (initialValue?: string) => {
    const [current, setCurrent] = React.useState(initialValue)
    const { data: test, error } = useSuspenseQuery(query)
    const data = ["A", "B", "C"]

    console.log(test, error)

    const CategorySelect = () => {
        return (
            <Select placeholder="選択なし" allowDeselect data={data} value={current && data.includes(current) ? current : undefined} onChange={(value) => {
                setCurrent(value ?? undefined)
            }} />
        )
    }

    return {
        CategorySelect,
        current,
    }
}