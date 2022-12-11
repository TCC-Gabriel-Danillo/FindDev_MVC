export interface AuthResponse {
    id: number
    username: string
    profileUrl: string
    photoUrl?: string
    email?: string
    techs?: Array<string>
}