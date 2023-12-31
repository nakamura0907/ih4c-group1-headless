export const siteMeta = {
  lang: "ja",
  title: "上越観光マップ",
  description: "上越市観光アプリケーション",
} as const;

export const routes = {
  index: {
    path: "/",
    name: "ホーム",
  },
  spots: {
    slug: {
      path: (slug: string) => `/spots/${slug}`,
    },
  },
  courses: {
    models: {
      index: {
        path: "/courses/models",
        name: "モデルコース一覧",
      },
      slug: {
        path: (slug: string) => `/courses/models/${slug}`,
      },
    },
    originals: {
      index: {
        path: "/courses/originals",
        name: "オリジナルコース一覧",
      },
      slug: {
        path: (slug: string) => `/courses/originals/${slug}`,
      },
      create: {
        path: "/courses/originals/create",
        name: "オリジナルコース作成",
      },
    },
  },
} as const;

export const localImages = {
  logo: {
    path: "/logo.png",
    alt: `${siteMeta.title} ロゴ`,
  },
  noImage: {
    path: "/no-image.png",
  },
} as const;
