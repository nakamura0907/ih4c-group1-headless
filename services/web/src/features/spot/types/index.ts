export type Spot = {
    id: string
    name: string
    description: string
    category: string
    photo: string
    geometry: {
        location: {
            lat: number
            lng: number
        }
    }
}

export type SpotApi = {
    fetchSpotList: () => Promise<Spot[]>
    fetchSpotById: (id: string) => Promise<Spot>
}