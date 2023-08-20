import React from "react"

export const useCategorySelect = (initialValue?: string) => {
    const [current, setCurrent] = React.useState(initialValue)

    return {
        CategorySelectBox,
        current,
    }
}

const renderSelectBox = () => {}

const CategorySelectBox = () => {
    return (
        <></>
    )
}