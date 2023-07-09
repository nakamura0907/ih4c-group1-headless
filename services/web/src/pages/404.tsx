import Layout from "@/components/template/layout";
import type { NextPage } from "next";

const Custom404: NextPage = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-4xl">404 - Page Not Found</h1>
      </div>
    </Layout>
  );
};

export default Custom404;
