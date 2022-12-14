import { FirebaseUserDto } from "_/services/userService/dto"
import { User } from "_/types"

export const mapUserToFirebaseUser = (user: User): FirebaseUserDto => {
    return {
        email: user.email,
        id: user.id,
        username: user.username,
        photoUrl: user.photoUrl,
        techs: user.techs,
        position: {
            latitude: user.position.location.latitude,
            longitude: user.position.location.longitude,
            geohash: user.position.geohash
        },
        profileUrl: user.profileUrl
    }
}