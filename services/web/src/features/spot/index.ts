import { externalSpotApi } from "./api/external";
import { SpotApi } from "./types";

export type { Spot } from "./types";
export const services: SpotApi = externalSpotApi();

export * from "./components/SpotImage"
export * from "./components/SpotList"