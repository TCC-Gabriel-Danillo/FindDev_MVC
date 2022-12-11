export interface FirebaseUserDto {
    username: string
    id: number
    photoUrl?: string
    email?: string
    techs?: Array<string>
    profileUrl: string
    position: {
        latitude: number
        longitude: number
        geohash: string
    }
}