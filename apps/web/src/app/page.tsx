import { SpotList } from "@/features/spots/SpotList";
import { SpotsSearchBox } from "@/features/spots/SpotsSearchBox";

export default function Home() {
  return (
    <article>
      <SpotsSearchBox />
      <SpotList />
    </article>
  );
}
