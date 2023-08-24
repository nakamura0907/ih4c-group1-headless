"use client";

import { useSearchParams } from "next/navigation";
import { useCategorySelect } from "../categories/useCategorySelect"

export const SpotsSearchBox = () => {
    const searchParams = useSearchParams();

    const categorySearchParam = searchParams?.get("category") ?? undefined;
    const { current, CategorySelect } = useCategorySelect(categorySearchParam);

    return(
        <div>
            検索エリア
            <CategorySelect />
        </div>
    )
}