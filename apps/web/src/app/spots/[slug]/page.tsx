import { Page } from "./_page";

export default function SpotsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <Page params={params} />;
}
