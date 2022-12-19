export type LatLng = {
    latitude: number
    longitude: number
}

export type Position = {
    location: LatLng
    geohash: string
}

export interface User {
    id: string
    username: string
    profileUrl: string
    position: Position
    photoUrl?: string
    email?: string
    techs?: Array<string>
}