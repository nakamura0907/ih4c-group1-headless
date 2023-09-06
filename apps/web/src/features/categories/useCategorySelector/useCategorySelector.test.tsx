import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { useCategorySelector } from "@/features/categories/useCategorySelector";
import { ApolloMockProvider } from "@/helpers/test/mock";
import { CategoriesDocument } from "@/gen/actions";

const Internal = ({ initialValue }: { initialValue?: string }) => {
  const { current } = useCategorySelector(initialValue);
  if (!current) return <p>Unknown</p>;
  return <p>{current}</p>;
};

const mockResult = {
  data: {
    categories: {
      data: [
        {
          id: "1",
          attributes: {
            title: "test",
          },
        },
      ],
    },
  },
};
const mocks = [
  {
    request: {
      query: CategoriesDocument,
    },
    result: mockResult,
  },
];

describe("@/features/categories/useCategorySelector", () => {
  describe("第一引数の値が存在しない", () => {
    it("返り値のcurrentがunknownと一致する", async () => {
      render(
        <ApolloMockProvider mocks={mocks}>
          <Internal />
        </ApolloMockProvider>,
      );
      expect(await screen.findByText("Unknown")).toBeInTheDocument();
    });
  });
  describe("第一引数に値が存在する", () => {
    describe("値がカテゴリーの値と一致する", () => {
      it("返り値のcurrentが引数の値と一致する", async () => {
        render(
          <ApolloMockProvider mocks={mocks}>
            <Internal initialValue="1" />
          </ApolloMockProvider>,
        );
        expect(await screen.findByText("Unknown")).toBeInTheDocument();
        expect(await screen.findByText("1")).toBeInTheDocument();
      });
    });
    describe("値がカテゴリーの値と一致しない", () => {
      it("返り値のcurrentがunknownと一致する", async () => {
        render(
          <ApolloMockProvider mocks={mocks}>
            <Internal initialValue="2" />
          </ApolloMockProvider>,
        );
        expect(await screen.findByText("Unknown")).toBeInTheDocument();
        expect(await screen.queryByText("2")).not.toBeInTheDocument();
      });
    });
  });
});
