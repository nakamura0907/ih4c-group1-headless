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
export type StrapiPostEntryResponse<T> = {
    data: T
}

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
        latitude: number,
        longitude: number,
        postCode: string,
        address: string,
        contact: string | null,
        businessHours: string | null,
        categories: {
            data: StrapiCategory[]
        },
        holidayIds: {
            data: {
                attributes: {
                    name: string,
                }
            }[]
        },
        photo: {
            data: {
                attributes: {
                    /** e.g. /uploads/no_image_06ce5a6ad1.png */
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
export type StrapiOriginalCourse = StrapiModelCourse;

export const fetch = axios.create({
    baseURL: strapiBaseUrl,
    headers: {
        Authorization: `Bearer ${strapiToken}`
    }
});
fetch.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status !== 404 && process.env.NODE_ENV === "development") console.error(error);
        return Promise.reject(error);
    }
);

export const errorHandler = (error: unknown) => {
    return (
        !axios.isAxiosError(error) ||
        !error.response ||
        error.response.status >= 500
    )
}