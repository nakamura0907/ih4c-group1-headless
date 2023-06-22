import axios from "axios";
import { FetchSpotListOptions, Spot, SpotApi } from "../types"
import { StrapiGetEntriesResponse, StrapiGetEntryResponse, StrapiSpot, strapiBaseUrl, strapiToken } from "@/utils/fetcher/strapi";

export const strapiSpotApi = (): SpotApi => {
    const fetchSpotList = async (options?: FetchSpotListOptions) => {
        const filters = toStrapiFilters(options?.filter);

        const response = await axios.get<StrapiGetEntriesResponse<StrapiSpot>>(
            `${strapiBaseUrl}/spots`,{
                headers: {
                    Authorization: `Bearer ${strapiToken}`
                },
                params: {
                    populate: "photo,category",
                    filters
                }
            }
        );

        return response.data.data.map(translateStrapiSpotToSpot);
    }

    const fetchSpotById = async (id: string) => {
        const response = await axios.get<StrapiGetEntryResponse<StrapiSpot>>(`${strapiBaseUrl}/spots/${id}`, {
            headers: {
                Authorization: `Bearer ${strapiToken}`
            },
            params: {
                populate: "photo,category"
            }
        });
        
        return translateStrapiSpotToSpot(response.data.data);
    }

    const toStrapiFilters = (filter: FetchSpotListOptions['filter']) => {
        if (!filter || filter.id.length === 0) {
            return undefined;
        }

        return {
            id: {
                $in: filter.id
            }
        }
    }

    return {
        fetchSpotList,
        fetchSpotById
    }
}

export const translateStrapiSpotToSpot = (spot: StrapiSpot): Spot => ({
    id: spot.id.toString(),
    name: spot.attributes.name,
    description: spot.attributes.description,
    category: spot.attributes.category.data.attributes.name,
    photo: spot.attributes.photo.data?.attributes.url ?? "",
    geometry: {
        location: {
            lat: spot.attributes.latitude ?? 0,
            lng: spot.attributes.longitude ?? 0
        }
    },
});