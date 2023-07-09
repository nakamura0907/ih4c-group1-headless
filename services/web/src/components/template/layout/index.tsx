import { MenuOutlined } from "@ant-design/icons";
import { Drawer, FloatButton } from "antd";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type State = {
  open: boolean;
};

const initialState: State = {
  open: false,
};

export type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [open, setOpen] = React.useState(initialState.open);

  return (
    <>
      <Head>
        <title>上越ナビ</title>
      </Head>
      <div>
        <header className="mb-7 border-b border-gray-200">
          <div>
            <h1
              style={{
                minHeight: 96,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link href="/">
                <Image src="/logo.png" alt="上越ナビ" width={350} height={75} />
              </Link>
            </h1>
          </div>
        </header>
        <main className="px-4 max-w-5xl mx-auto">{children}</main>
        <footer className="mt-7 py-3">
          <small className="flex justify-center">
            Copyright &copy; 2023 上越観光マップ
          </small>
        </footer>
      </div>
      <FloatButton icon={<MenuOutlined />} onClick={() => setOpen(true)} />
      <Drawer
        placement="bottom"
        closable={false}
        onClose={() => setOpen(initialState.open)}
        open={open}
      >
        <nav className="w-full max-w-lg mx-auto flex flex-wrap gap-y-3">
          <Link href="/" className="w-full md:w-2/4 text-blue-500">
            トップページ
          </Link>
          <Link
            href="/travel-brochures/spots"
            className="w-full md:w-2/4 text-blue-500"
          >
            旅のしおり
          </Link>
          <Link
            href="/courses/models"
            className="w-full md:w-2/4 text-blue-500"
          >
            モデルコース一覧
          </Link>
          <Link
            href="/courses/originals"
            className="w-full md:w-2/4 text-blue-500"
          >
            オリジナルコース一覧
          </Link>
          <Link
            href="/courses/originals/create"
            className="w-full md:w-2/4 text-blue-500"
          >
            オリジナルコース作成
          </Link>
        </nav>
      </Drawer>
    </>
  );
};

export default Layout;
