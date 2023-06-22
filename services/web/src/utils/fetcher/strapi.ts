import axios from "axios";

export const strapiBaseUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api`;
export const strapiToken = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

export type StrapiGetEntriesResponse<T> = {
    data: T[],
    meta: {
        pagination: {
            page: number,
            pageSize: number,
            pageCount: number,
            total: number
        }
    }
};
export type StrapiGetEntryResponse<T> = {
    data: T
};

export type StrapiCategory = {
    attributes: {
        name: string,
    },
    id: number,
};

export type StrapiSpot = {
    attributes: {
        name: string,
        description: string,
        latitude: number | null,
        longitude: number | null,
        category: {
            data: StrapiCategory
        },
        photo: {
            data: {
                attributes: {
                    /* e.g. /uploads/no_image_06ce5a6ad1.png */
                    url: string
                }
            } | null,
        }
    },
    id: number,
}

export type StrapiModelCourse = {
    attributes: {
        name: string,
        description: string,
        spots: {
            data: StrapiSpot[]
        }
    },
    id: number
}

export const fetch = axios.create({
    baseURL: strapiBaseUrl,
    headers: {
        Authorization: `Bearer ${strapiToken}`
    }
});
