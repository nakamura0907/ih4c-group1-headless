import "./globals.css";

import { siteMeta } from "@/config";
import { ApolloWrapper } from "@/providers/apollo";
import { RootStyleRegistry } from "@/providers/mantine";
import Image from "next/image";
import Link from "next/link";

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
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="px-4 max-w-5xl w-full mx-auto mb-auto">
                {children}
              </main>
              <Footer />
            </div>
          </ApolloWrapper>
        </RootStyleRegistry>
      </body>
    </html>
  );
}

const Header = () => {
  return(
    <header className="mb-7 border-0 border-b border-solid border-gray-200">
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
            <Image src="/logo.png" alt={`${siteMeta.title} ロゴ`} width={350} height={75} />
          </Link>
        </h1>
      </div>
    </header>
  )
}

const Footer = () => {
  return(
    <footer className="mt-7 py-3">
      <small className="flex justify-center">
        Copyright &copy; 2023 {siteMeta.title}
      </small>
    </footer>
  )
}