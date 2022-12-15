export interface AuthResponse {
    id: string
    username: string
    profileUrl: string
    photoUrl?: string
    email?: string
    techs?: Array<string>
}