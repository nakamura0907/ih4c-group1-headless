"use client";

import { useCategorySelect } from "../categories/useCategorySelect"

export const SpotsSearchBox = () => {
    const { current, CategorySelect } = useCategorySelect("B");

    console.log(current)
    return(
        <div>
            検索エリア
            <CategorySelect />
        </div>
    )
}