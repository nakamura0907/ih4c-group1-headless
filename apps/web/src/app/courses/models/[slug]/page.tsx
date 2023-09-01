import { Page } from "@/components/page/courses/models/[slug]";

export default function CoursesModelsDetail({
  params,
}: {
  params: { slug: string };
}) {
  return <Page params={params} />;
}
