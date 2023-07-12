import React from "react";
import {
  DirectionsRenderer,
  DirectionsService,
  DirectionsServiceProps,
  GoogleMapProps,
} from "@react-google-maps/api";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};
// MAP中央を上越市都市部に
const center = {
  lat: 37.1478,
  lng: 138.236,
};

export type MyMapProps = Omit<
  GoogleMapProps,
  "id" | "mapContainerStyle" | "onLoad"
> & {
  children?: React.ReactNode;
};
const MyMap: React.FC<MyMapProps> = (props) => {
  const { children, ...rest } = props;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  const mapRef = React.useRef<google.maps.Map>();
  const handleLoad = React.useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return <div>エラーが発生しました</div>;
  if (!isLoaded) return <div>読み込み中...</div>;

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      //   center={center}
      onLoad={handleLoad}
      {...rest}
    >
      {children}
    </GoogleMap>
  );
};
MyMap.defaultProps = {
  center,
  zoom: 10,
};

export type MyDirectionProps = Pick<DirectionsServiceProps, "options">;
export const MyDirection: React.FC<MyDirectionProps> = ({ options }) => {
  const [currentDirection, setCurrentDirection] =
    React.useState<google.maps.DirectionsResult | null>(null);

  const handleCallback = React.useCallback(
    (
      result: google.maps.DirectionsResult | null,
      status: google.maps.DirectionsStatus
    ) => {
      if (!result) return;
      if (status !== google.maps.DirectionsStatus.OK) return;

      if (currentDirection) {
        if (
          result.geocoded_waypoints?.length !==
          currentDirection.geocoded_waypoints?.length
        ) {
          setCurrentDirection(result);
        }
      } else {
        setCurrentDirection(result);
      }
    },
    []
  );

  return (
    <>
      <DirectionsService options={options} callback={handleCallback} />
      {currentDirection !== null && (
        <DirectionsRenderer
          options={{
            directions: currentDirection,
          }}
        />
      )}
    </>
  );
};

export default MyMap;
