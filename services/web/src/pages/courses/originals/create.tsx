import {
  StrapiOriginalCourse,
  StrapiPostEntryResponse,
  fetch,
} from "@/utils/fetcher/strapi";
import { PrimaryButton } from "@/components/ui/button";
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
  spots: StrapiSpot[];
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

  /**
   * オリジナルコースに追加するスポットを選択する
   */
  const toggleSpotSelection = (spotId: string) => {
    // selectedSpotsにspotIdが含まれていれば、selectedSpotsからspotIdを削除する
    // なければ、selectedSpotsにspotIdを追加する
    if (selectedSpots.includes(spotId)) {
      setSelectedSpots(
        selectedSpots.filter((selectedSpot) => selectedSpot != spotId)
      );
    } else {
      if (selectedSpots.length >= 6) {
        message.info("最大経路数は6件です");
        return;
      }

      setSelectedSpots([...selectedSpots, spotId]);
    }
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
          const index = selectedSpots.indexOf(spot.id.toString());
          return (
            <li
              key={spot.id}
              onClick={() => toggleSpotSelection(spot.id.toString())}
            >
              <SelectBadge index={index + 1}>
                <SpotImage
                  src={spot.attributes.photo.data?.attributes.url}
                  alt={spot.attributes.name}
                />
              </SelectBadge>
              <span>{spot.attributes.name}</span>
            </li>
          );
        })}
      </SpotList>
      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        showSizeChanger={false}
        total={pagination.total}
        onChange={handlePageChange}
      />
      <Form form={form} onFinish={handleFinish}>
        <Form.Item
          label="オリジナルコース名"
          name="name"
          required
          rules={[
            {
              required: true,
              message: "オリジナルコース名を入力してください",
            },
            {
              max: 50,
              message: "オリジナルコース名は50文字以内で入力してください",
            },
          ]}
        >
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
