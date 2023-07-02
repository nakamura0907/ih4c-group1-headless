import Head from "next/head";
import Link from "next/link";
import React from "react";

export type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>上越ナビ</title>
      </Head>
      <div>
        <header>
          <div className="mb-5 flex flex-col">
            <Link href="/" className="text-blue-500">
              トップページ
            </Link>
            <Link href="/spots/1" className="text-blue-500">
              観光スポット詳細 例1
            </Link>
            <Link href="/travel-brochures/spots" className="text-blue-500">
              旅のしおり 観光スポット
            </Link>
            <Link href="/courses/models" className="text-blue-500">
              モデルコース一覧
            </Link>
            <Link href="/courses/models/1" className="text-blue-500">
              モデルコース詳細 例1
            </Link>
            <Link href="/courses/originals" className="text-blue-500">
              オリジナルコース一覧
            </Link>
            <Link href="/courses/originals/create" className="text-blue-500">
              オリジナルコース作成
            </Link>
            <Link href="/courses/originals/5" className="text-blue-500">
              オリジナルコース詳細 例1
            </Link>
          </div>
        </header>
        <main className="px-4 max-w-5xl mx-auto">{children}</main>
      </div>
    </>
  );
};

export default Layout;
