import { FirebaseUserDto } from "_/services/userService/dto"
import { User } from "_/types"

export const mapUserToFirebaseUser = (user: User): FirebaseUserDto => {
    return {
        email: user.email,
        id: user.id,
        username: user.username,
        photoUrl: user.photoUrl,
        techs: user.techs,
        position: user.position,
        profileUrl: user.profileUrl
    }
}