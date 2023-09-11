import { Page } from "@/app/courses/originals/[slug]/_page";

export default function CoursesOriginalsDetail({
  params,
}: {
  params: { slug: string };
}) {
  return <Page params={params} />;
}
