import { useCategorySelect } from "../categories/useCategorySelect"

export const SpotsSearchBox = () => {
    const { current, CategorySelectBox } = useCategorySelect("1");

    return(
        <>
            検索エリア
            <CategorySelectBox />
        </>
    )
}