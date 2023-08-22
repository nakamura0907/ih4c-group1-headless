"use client";

import { Select } from "@/components/ui/select";
import React from "react"

export const useCategorySelect = (initialValue?: string) => {
    const [current, setCurrent] = React.useState(initialValue)
    const data = ["A", "B", "C"]

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