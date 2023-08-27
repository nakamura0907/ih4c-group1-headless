"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCategorySelect } from "../categories/useCategorySelect";
import { Button, Container, Flex, TextInput } from "@mantine/core";
import { useForm } from "@/hooks/useMantine";

type FormValues = {
  q?: string;
};

/**
 * 観光スポット検索フォームコンポーネント
 */
export const SpotsSearchBox = () => {
  const router = useRouter();
  const pathname = usePathname() ?? "/";

  const searchParams = useSearchParams();
  const qSearchParam = searchParams?.get("q") ?? "";
  const categorySearchParam = searchParams?.get("category") ?? undefined;

  const { current, CategorySelect } = useCategorySelect(categorySearchParam);

  const form = useForm<FormValues>({
    initialValues: {
      q: qSearchParam,
    },
  });

  const handleSubmit = (values: FormValues) => {
    const q = `q=${values.q}`;
    const category = current ? `&category=${current}` : "";
    const query = `${q}${category}&page=1`;

    router.push(`${pathname}?${query}`);
  };

  return (
    <Container size="xs">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex>
          <TextInput
            placeholder="XX博物館"
            style={{ width: "100%" }}
            {...form.getInputProps("q")}
          />
          <Button type="submit">検索</Button>
        </Flex>
        <CategorySelect />
      </form>
    </Container>
  );
};
