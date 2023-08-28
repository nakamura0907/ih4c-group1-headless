import "./globals.css";

import { ApolloWrapper } from "@/providers/apollo";
import { Image } from "@/components/ui/image"
import { Link } from "@/components/ui/link";
import { RootStyleRegistry } from "@/providers/mantine";
import { siteMeta } from "@/config";

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
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="mx-auto mb-auto w-full max-w-5xl px-4">
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
  return (
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
            <Image
              src="/logo.png"
              alt={`${siteMeta.title} ロゴ`}
              width={350}
              height={75}
              priority
            />
          </Link>
        </h1>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="mt-7 py-3">
      <small className="flex justify-center">
        Copyright &copy; 2023 {siteMeta.title}
      </small>
    </footer>
  );
};
