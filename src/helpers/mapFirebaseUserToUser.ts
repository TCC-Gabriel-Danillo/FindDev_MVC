import { FirebaseUserDto } from "_/services/userService/dto"
import { User } from "_/types"

export const mapFirebaseUserToUser = (fUser: FirebaseUserDto): User => {
    return {
        email: fUser.email,
        id: fUser.id,
        username: fUser.username,
        photoUrl: fUser.photoUrl,
        techs: fUser.techs,
        position: {
            location: {
                latitude: fUser.position.latitude,
                longitude: fUser.position.longitude
            },
            geohash: fUser.position.geohash
        },
        profileUrl: fUser.profileUrl
    }
}