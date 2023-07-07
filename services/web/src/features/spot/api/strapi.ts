import { FetchSpotListOptions, Spot, SpotApi } from "../types"
import { StrapiGetEntriesResponse, StrapiGetEntryResponse, StrapiSpot, fetch, strapiBaseUrl, strapiToken } from "@/utils/fetcher/strapi";

export const strapiSpotApi = (): SpotApi => {
    const fetchSpotList = async (options?: FetchSpotListOptions) => {
        const filters = toStrapiFilters(options?.filter);

        const response = await fetch.get<StrapiGetEntriesResponse<StrapiSpot>>(
            `${strapiBaseUrl}/spots`,{
                params: {
                    populate: "photo,categories,holidayIds",
                    filters
                }
            }
        );

        return response.data.data.map(translateStrapiSpotToSpot);
    }

    const fetchSpotById = async (id: string) => {
        const response = await fetch.get<StrapiGetEntryResponse<StrapiSpot>>(`${strapiBaseUrl}/spots/${id}`, {
            params: {
                populate: "photo,categories,holidayIds"
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
    categories: spot.attributes.categories.data.map(category => category.attributes.name),
    photo: spot.attributes.photo.data?.attributes.url ?? "",
    geometry: {
        location: {
            lat: spot.attributes.latitude ?? 0,
            lng: spot.attributes.longitude ?? 0
        }
    },
});