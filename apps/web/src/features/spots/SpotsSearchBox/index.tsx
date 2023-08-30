"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Flex } from "@/components/ui/Flex";
import { TextInput } from "@/components/ui/Input";
import { useCategorySelect } from "../../categories/useCategorySelect";
import { useForm } from "@/hooks/useMantine";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { searchParams } from "../../constants";

type FormValues = {
  q?: string;
};

/**
 * 観光スポット検索フォームコンポーネント
 */
export const SpotsSearchBox = () => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParamsObj = useSearchParams();
  const qSearchParam = searchParams.query.get(searchParamsObj);
  const categorySearchParam = searchParams.category.get(searchParamsObj);

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
