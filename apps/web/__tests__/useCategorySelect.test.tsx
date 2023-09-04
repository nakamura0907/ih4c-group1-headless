import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { useCategorySelect } from "@/features/categories/useCategorySelect";
import { ApolloMockProvider } from "./mock";
import { CategoriesDocument } from "@/gen/actions";

describe("引数が存在しない", () => {
  test("返り値のcurrentがunknown", async () => {
    render(
      <ApolloMockProvider mocks={mocks}>
        <Internal />
      </ApolloMockProvider>,
    );
    expect(await screen.findByText("Unknown")).toBeInTheDocument();
  });
});
describe("初期値が与えられる", () => {
  describe("初期値がカテゴリーの値と一致する", () => {
    it("返り値のcurrentが引数の値", async () => {
      render(
        <ApolloMockProvider mocks={mocks}>
          <Internal initialValue="1" />
        </ApolloMockProvider>,
      );
      expect(await screen.findByText("Unknown")).toBeInTheDocument();
      expect(await screen.findByText("1")).toBeInTheDocument();
    });
  });
  describe("初期値がカテゴリーの値と一致しない", () => {
    it("返り値のcurrentがunknown", async () => {
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

const Internal = ({ initialValue }: { initialValue?: string }) => {
  const { current } = useCategorySelect(initialValue);
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
