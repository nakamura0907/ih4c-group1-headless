import { fetch } from "@/utils/fetcher/strapi";
import { useRouter } from "next/router";
import {
  CategorySelect,
  SpotImage,
  SpotList,
  defaultCategory,
} from "@/features/spot";
import {
  StrapiGetEntriesResponse,
  StrapiSpot,
  errorHandler,
} from "@/utils/fetcher/strapi";
import FormContainer from "@/components/module/form-container";
import Headline from "@/components/module/headline";
import Layout from "@/components/template/layout";
import Link from "@/components/ui/link";
import message from "@/components/ui/message";
import Pagination from "@/components/ui/pagination";
import React from "react";
import type { NextPage } from "next";

type RefactorResponse = StrapiGetEntriesResponse<StrapiSpot>;

type State = {
  spots: StrapiSpot[];
  category: string;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
};

const initialState: State = {
  spots: [],
  category: defaultCategory.value,
  pagination: {
    current: 1,
    pageSize: 25,
    total: 0,
  },
};

const Home: NextPage = () => {
  const router = useRouter();

  const [spots, setSpots] = React.useState(initialState.spots);
  const [category, setCategory] = React.useState(initialState.category);
  const [pagination, setPagination] = React.useState(initialState.pagination);

  /**
   * 観光スポット一覧を取得する
   */
  React.useEffect(() => {
    (async () => {
      if (!router.isReady) return;

      const { page, category } = router.query;
      const response = await fetch.get<RefactorResponse>("/spots", {
        params: {
          populate: "photo,categories,holidayIds",
          "pagination[page]": isNaN(Number(page)) ? 1 : Number(page),
          filters: {
            categories:
              category === "*"
                ? undefined
                : {
                    id: {
                      $eq: category,
                    },
                  },
          },
        },
      });

      setSpots(response.data.data);
      if (category) setCategory(category.toString());
      setPagination({
        current: response.data.meta.pagination.page,
        pageSize: response.data.meta.pagination.pageSize,
        total: response.data.meta.pagination.total,
      });
    })().catch((error) => {
      const msg = "観光スポット一覧の取得に失敗しました。";
      if (errorHandler(error)) {
        message.error(msg);
        return;
      }
      if (error.response.status === 404) return;
      message.error(error.response.data.message || msg);
    });
  }, [router]);

  const handleCategoryChange = (value: any) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, category: value, page: 1 },
      },
      undefined,
      { shallow: true }
    );
  };

  const handlePageChange = (page: number) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <Layout>
      <article>
        <Headline className="text-center">観光スポット一覧</Headline>
        <FormContainer className="mb-5">
          <CategorySelect value={category} onChange={handleCategoryChange} />
        </FormContainer>
        <SpotList>
          {spots.map((spot) => (
            <li key={spot.id}>
              <Link href={`/spots/${spot.id}`}>
                <SpotImage
                  src={spot.attributes.photo.data?.attributes.url}
                  alt={spot.attributes.name}
                />
                <span>{spot.attributes.name}</span>
              </Link>
            </li>
          ))}
        </SpotList>
        <Pagination
          className="flex justify-center"
          current={pagination.current}
          pageSize={pagination.pageSize}
          showSizeChanger={false}
          total={pagination.total}
          onChange={handlePageChange}
        />
      </article>
    </Layout>
  );
};

export default Home;
