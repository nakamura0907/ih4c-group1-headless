export type Spot = {
    id: string
    name: string
    description: string
    categories: string[]
    photo: string
    geometry: {
        location: {
            lat: number
            lng: number
        }
    }
}

export type FetchSpotListOptions = {
    filter?: {
        id: Spot['id'][]
    }
}
export type SpotApi = {
    /** 観光スポット一覧取得API */
    fetchSpotList: (options?: FetchSpotListOptions) => Promise<Spot[]>
    /** 観光スポット詳細取得API */
    fetchSpotById: (id: string) => Promise<Spot>
}