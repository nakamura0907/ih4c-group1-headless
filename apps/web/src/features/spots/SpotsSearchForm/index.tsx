"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Flex } from "@/components/ui/Flex";
import { TextInput } from "@/components/ui/Input";
import { useCategorySelector } from "@/features/categories";
import { useForm } from "@/hooks/useMantine";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { searchParams } from "@/features/constants";

type FormValues = {
  q?: string;
};

/**
 * 観光スポット検索フォームコンポーネント
 */
export const SpotsSearchForm = () => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParamsObj = useSearchParams();
  const initialQuery = searchParams.query.get(searchParamsObj);
  const initialCategory = searchParams.category.get(searchParamsObj);

  const { current: selectedCategory, CategorySelector } =
    useCategorySelector(initialCategory);

  const form = useForm<FormValues>({
    initialValues: {
      q: initialQuery,
    },
  });

  const handleSearch = (values: FormValues) => {
    const q = `q=${values.q}`;
    const category = selectedCategory ? `&category=${selectedCategory}` : "";
    const query = `${q}${category}&page=1`;

    router.push(`${pathname}?${query}`);
  };

  return (
    <Container size="xs" mb="lg">
      <form onSubmit={form.onSubmit(handleSearch)}>
        <Flex>
          <TextInput
            placeholder="XX博物館"
            style={{ width: "100%" }}
            {...form.getInputProps("q")}
          />
          <Button type="submit">検索</Button>
        </Flex>
        <CategorySelector />
      </form>
    </Container>
  );
};
