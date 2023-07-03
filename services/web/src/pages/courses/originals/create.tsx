import {
  StrapiOriginalCourse,
  StrapiPostEntryResponse,
  fetch,
} from "@/utils/fetcher/strapi";
import { PrimaryButton } from "@/components/ui/button";
import { translateStrapiSpotToSpot } from "@/features/spot/api/strapi";
import { useRouter } from "next/router";
import {
  CategorySelect,
  Spot,
  SpotImage,
  SpotList,
  defaultCategory,
} from "@/features/spot";
import {
  StrapiGetEntriesResponse,
  StrapiSpot,
  errorHandler,
  strapiBaseUrl,
} from "@/utils/fetcher/strapi";
import Layout from "@/components/template/layout";
import Badge from "@/components/ui/badge";
import Form from "@/components/ui/form";
import Input from "@/components/ui/input";
import message from "@/components/ui/message";
import Pagination from "@/components/ui/pagination";
import React from "react";
import type { NextPage } from "next";

type RefactorResponse = StrapiGetEntriesResponse<StrapiSpot>;

type State = {
  spots: Spot[];
  selectedSpots: string[];
  category: string;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
};

const initialState: State = {
  spots: [],
  selectedSpots: [],
  category: defaultCategory.value,
  pagination: {
    current: 1,
    pageSize: 25,
    total: 0,
  },
};

type FormValues = {
  name: string;
};

const OriginalCourseCreate: NextPage = () => {
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();

  const [spots, setSpots] = React.useState(initialState.spots);
  const [selectedSpots, setSelectedSpots] = React.useState(
    initialState.selectedSpots
  );
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

  /**
   * オリジナルコースに追加するスポットを選択する
   */
  const toggleSpotSelection = (spotId: string) => {
    // selectedSpotsにspotIdが含まれていれば、selectedSpotsからspotIdを削除する
    // なければ、selectedSpotsにspotIdを追加する
    const newSelectedSpots = selectedSpots.includes(spotId)
      ? selectedSpots.filter((selectedSpot) => selectedSpot != spotId)
      : [...selectedSpots, spotId];

    setSelectedSpots(newSelectedSpots);
  };

  /**
   * オリジナルコースを作成する
   */
  const handleFinish = async (values: FormValues) => {
    const url = `${strapiBaseUrl}/original-courses`;
    const response = await fetch.post<
      StrapiPostEntryResponse<StrapiOriginalCourse>
    >(url, {
      data: {
        name: values.name,
        spots: {
          connect: selectedSpots.map((spotId) => spotId),
        },
      },
    });

    setSelectedSpots(initialState.selectedSpots);
    form.resetFields();

    router.push(`/courses/originals/${response.data.data.id}`);
  };

  const handleCategoryChange = (value: string) => {
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
      <h2>オリジナルコース</h2>
      <CategorySelect value={category} onChange={handleCategoryChange} />
      <SpotList>
        {spots.map((spot) => {
          const index = selectedSpots.indexOf(spot.id);
          return (
            <li key={spot.id} onClick={() => toggleSpotSelection(spot.id)}>
              <SelectBadge index={index + 1}>
                <SpotImage src="/no-image.png" alt={spot.name} />
              </SelectBadge>
              <span>{spot.name}</span>
            </li>
          );
        })}
      </SpotList>
      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onChange={handlePageChange}
      />
      <Form form={form} onFinish={handleFinish}>
        <Form.Item label="オリジナルコース名" name="name" required>
          <Input placeholder="オリジナルコース名" />
        </Form.Item>
        <Form.Item>
          <PrimaryButton disabled={selectedSpots.length == 0} htmlType="submit">
            オリジナルコースの作成
          </PrimaryButton>
        </Form.Item>
      </Form>
    </Layout>
  );
};

type SelectBadgeProps = {
  index: number;
  children: React.ReactNode;
};
const SelectBadge: React.FC<SelectBadgeProps> = (props) => {
  const { index, children } = props;

  if (index <= 0) return <>{children}</>;
  return <Badge count={index}>{children}</Badge>;
};

export default OriginalCourseCreate;
