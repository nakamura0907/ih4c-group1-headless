import axios from "axios";
import { Spot, SpotApi } from "../types"
import { StrapiGetEntriesResponse, StrapiGetEntryResponse, StrapiSpot, strapiBaseUrl, strapiToken } from "../../../utils/fetcher/strapi";

export const externalSpotApi = (): SpotApi => {
    const fetchSpotList = async () => {
        const response = await axios.get<StrapiGetEntriesResponse<StrapiSpot>>(
            `${strapiBaseUrl}/spots?populate=photo,category`,{
                headers: {
                    Authorization: `Bearer ${strapiToken}`
                }
            }
        );

        return response.data.data.map(translateStrapiSpotToSpot);
    }

    const fetchSpotById = async (id: string) => {
        const response = await axios.get<StrapiGetEntryResponse<StrapiSpot>>(`${strapiBaseUrl}/spots/${id}?populate=photo,category`, {
            headers: {
                Authorization: `Bearer ${strapiToken}`
            }
        });
        
        return translateStrapiSpotToSpot(response.data.data);
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