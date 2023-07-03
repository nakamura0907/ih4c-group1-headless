import {
  CategorySelect,
  Spot,
  SpotImage,
  SpotList,
  defaultCategory,
} from "@/features/spot";
import Layout from "@/components/template/layout";
import Link from "next/link";
import React from "react";
import { Pagination, message } from "antd";
import {
  StrapiGetEntriesResponse,
  StrapiSpot,
  errorHandler,
} from "@/utils/fetcher/strapi";
import { fetch } from "@/utils/fetcher/strapi";
import { translateStrapiSpotToSpot } from "@/features/spot/api/strapi";
import { useRouter } from "next/router";
import type { NextPage } from "next";

type RefactorResponse = StrapiGetEntriesResponse<StrapiSpot>;

type State = {
  spots: Spot[];
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

      // TODO: features移動
      const { page, category } = router.query;
      const response = await fetch.get<RefactorResponse>("/spots", {
        params: {
          populate: "photo,category",
          "pagination[page]": isNaN(Number(page)) ? 1 : Number(page),
          filters: {
            category:
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
      const spots = response.data.data.map(translateStrapiSpotToSpot);

      setSpots(spots);
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
        <h2>観光スポット一覧</h2>
        <CategorySelect value={category} onChange={handleCategoryChange} />
        <SpotList>
          {spots.map((spot) => (
            <li key={spot.id}>
              <Link href={`/spots/${spot.id}`}>
                <SpotImage src={spot.photo} alt={spot.name} />
                <span>{spot.name}</span>
              </Link>
            </li>
          ))}
        </SpotList>
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onChange={handlePageChange}
        />
      </article>
    </Layout>
  );
};

export default Home;
