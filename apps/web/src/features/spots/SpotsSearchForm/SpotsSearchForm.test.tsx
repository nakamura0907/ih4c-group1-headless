import { render, screen, fireEvent } from "@testing-library/react";
import { SpotsSearchForm } from "./index";
import { usePathname, useRouter } from "next/navigation";
import { useCategorySelector } from "@/features/categories";

// next/navigationのモック
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));
const pushMock = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  push: pushMock,
});
(usePathname as jest.Mock).mockReturnValue("/test-pathname");

// @/features/categoriesのモック
jest.mock("@/features/categories", () => ({
  useCategorySelector: jest.fn(),
}));
(useCategorySelector as jest.Mock).mockReturnValue({
  current: "testCategory",
  CategorySelector: () => <div>CategorySelector</div>,
});

describe("@/features/spots/SpotsSearchForm", () => {
  describe("検索ボタンが押下される", () => {
    it("正しいURLにページ遷移する", () => {
      // イベント準備
      render(<SpotsSearchForm />);

      const input = screen.getByPlaceholderText("XX博物館");
      fireEvent.change(input, { target: { value: "testQuery" } });

      // Clickイベント発火
      const searchButton = screen.getByText("検索");
      fireEvent.click(searchButton);

      // ページ遷移の引数が正しいこと
      expect(pushMock).toHaveBeenCalledWith(
        "/test-pathname?q=testQuery&category=testCategory&page=1",
      );
    });
  });
});
