import { Page } from "@/components/page/spots/[slug]";

export default function SpotsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <Page params={params} />;
}
