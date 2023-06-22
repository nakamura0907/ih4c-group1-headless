import { NextPage } from "next";
import React from "react";
import Layout from "@/components/template/layout";
import Link from "next/link";
import { fetch } from "@/utils/fetcher/strapi";
import { translateStrapiSpotToSpot } from "@/features/spot/api/external";
import { SpotImage, SpotList } from "@/features/spot";

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
    setSpots(spots.filter((spot) => spot.id != spotId));
  };

  return (
    <Layout>
      <select>
        <option>すべてのスポット</option>
      </select>
      <SpotList>
        {spots.map((spot) => {
          return (
            <li key={spot.id}>
              <SpotImage src={spot.photo} alt={spot.name} />
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
      </SpotList>
    </Layout>
  );
};

export default TravelBrochure;
