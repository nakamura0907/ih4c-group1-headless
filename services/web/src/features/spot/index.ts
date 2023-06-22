import { strapiSpotApi } from "./api/strapi";
import { SpotApi } from "./types";

export type { Spot } from "./types";
export const services: SpotApi = strapiSpotApi();

export * from "./components/SpotImage"
export * from "./components/SpotList"