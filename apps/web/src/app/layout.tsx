import "./globals.css";

import { ApolloWrapper } from "@/providers/apollo";
import { RootStyleRegistry } from "@/providers/mantine";
import { siteMeta } from "@/config";
import { Layout } from "@/components/template/layout";

export const metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={siteMeta.lang}>
      <body suppressHydrationWarning={true}>
        <RootStyleRegistry>
          <ApolloWrapper>
            <Layout>{children}</Layout>
          </ApolloWrapper>
        </RootStyleRegistry>
      </body>
    </html>
  );
}
