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
    get: (searchParamsObj: ReadonlyURLSearchParams) => {
      const pageStr = searchParamsObj.get(searchParams.page.name);
      const page = Number(pageStr);
      if (isNaN(page)) {
        return 1;
      }
      if (page < 1) {
        return 1;
      }
      return page;
    },
  },
} as const;
