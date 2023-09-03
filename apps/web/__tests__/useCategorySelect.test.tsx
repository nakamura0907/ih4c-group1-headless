import "@testing-library/jest-dom";
import React from "react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";

const mocks:
  | readonly MockedResponse<Record<string, any>, Record<string, any>>[]
  | undefined = [];
const RenderComponent = () => {
  return (
    <MockedProvider mocks={mocks}>
      <div>Test</div>
    </MockedProvider>
  );
};

describe("useCategorySelect.test.ts", () => {
  it("サンプルテスト", async () => {
    render(<RenderComponent />);
    expect(await screen.findByText("Test")).toBeInTheDocument();
  });
});
