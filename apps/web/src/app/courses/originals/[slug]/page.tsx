import { Page } from "@/components/page/courses/originals/[slug]";

export default function CoursesOriginalsDetail({
  params,
}: {
  params: { slug: string };
}) {
  return <Page params={params} />;
}
