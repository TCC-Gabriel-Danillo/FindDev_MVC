import { Position, User, AuthResponse } from "_/types"

export const mapAuthResponseToUser = (authResponse: AuthResponse, position: Position): User => {
    return {
        email: authResponse.email,
        id: authResponse.id,
        profileUrl: authResponse.profileUrl,
        techs: authResponse.techs,
        username: authResponse.username,
        photoUrl: authResponse.photoUrl,
        position
    }
}