import { Page } from "@/app/courses/models/[slug]/_page";

export default function CoursesModelsDetail({
  params,
}: {
  params: { slug: string };
}) {
  return <Page params={params} />;
}
