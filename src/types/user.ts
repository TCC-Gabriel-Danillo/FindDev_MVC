export type Position = {
    latitude: number
    longitude: number
    geohash: string
}

export interface User {
    id: number
    username: string
    profileUrl: string
    position: Position
    photoUrl?: string
    email?: string
    techs?: Array<string>
}