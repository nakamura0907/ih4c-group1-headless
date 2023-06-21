import { NextPage } from "next";
import React from "react";
import Layout from "../../components/template/layout";
import Image from "next/image";
import Link from "next/link";
import { fetch } from "../../utils/fetcher/strapi";
import { translateStrapiSpotToSpot } from "../../features/spot/api/external";

type State = {
  spots: any[]; // FIXME: any
};

const initialState: State = {
  spots: [],
};

const TravelBrochure: NextPage = () => {
  const [spots, setSpots] = React.useState(initialState.spots);

  React.useEffect(() => {
    (async () => {
      const key = "travel-brochures-spots";
      const storedSpots = localStorage.getItem(key);

      if (!storedSpots) return;

      const parsedSpots = JSON.parse(storedSpots);
      if (!Array.isArray(parsedSpots) || parsedSpots.length === 0) return;

      const response = await fetch.get("/spots", {
        params: {
          filters: {
            id: {
              $in: parsedSpots,
            },
          },
          populate: "photo,category",
        },
      });
      console.log(response.data.data);
      setSpots(response.data.data.map(translateStrapiSpotToSpot));
    })();
  }, []);

  const handleClick = (spotId: string) => {
    const key = "travel-brochures-spots";
    const storedSpots = localStorage.getItem(key);

    if (!storedSpots) return;

    const parsedSpots = JSON.parse(storedSpots);
    if (!Array.isArray(parsedSpots)) return;

    const newSpots = parsedSpots.filter((spot: string) => spot != spotId);

    localStorage.setItem(key, JSON.stringify(newSpots));
    // setSpots(localSpotsData.filter((spot) => newSpots.includes(spot.id)));
    setSpots(spots.filter((spot) => spot.id != spotId));
  };

  return (
    <Layout>
      <select>
        <option>すべてのスポット</option>
      </select>
      <ul className="grid gap-8 grid-flow-row grid-cols-[repeat(2,1fr)]">
        {spots.map((spot) => {
          return (
            <li key={spot.id}>
              <Image
                src="/no-image.png"
                alt={spot.name}
                width={1980}
                height={1150}
                sizes={"100vw"}
                className="rounded-sm"
              />
              <p>{spot.name}</p>
              <div className="flex">
                <Link href={`/spots/${spot.id}`}>
                  <span className="text-blue-500">詳細</span>
                </Link>
                <button onClick={() => handleClick(spot.id)}>削除</button>
              </div>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default TravelBrochure;
