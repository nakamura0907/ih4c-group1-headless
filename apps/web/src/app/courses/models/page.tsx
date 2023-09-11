import { Page } from "@/app/courses/models/_page";
import { routes } from "@/config";

export const metadata = {
  title: routes.courses.models.index.name,
};

export default function CoursesModelsPage() {
  return <Page />;
}
