import { ReadonlyURLSearchParams } from "next/navigation";

export const searchParams = {
  category: {
    name: "category",
    get: (searchParamsObj: ReadonlyURLSearchParams) =>
      searchParamsObj.get(searchParams.category.name) ?? undefined,
  },
  query: {
    name: "q",
    get: (searchParamsObj: ReadonlyURLSearchParams) =>
      searchParamsObj.get(searchParams.query.name) ?? "",
  },
  page: {
    name: "page",
    get: (searchParamsObj: ReadonlyURLSearchParams) =>
      searchParamsObj.get(searchParams.page.name) ?? "1",
  },
} as const;
