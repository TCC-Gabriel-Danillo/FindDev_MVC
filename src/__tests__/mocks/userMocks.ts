import { FirebaseUserDto } from "_/services/userService/dto";
import { User } from "_/types";

export const firebaseUserMock: FirebaseUserDto = {
    id: "any_id",
    position: {
        geohash: "any_geohash",
        latitude: 0.0,
        longitude: 0.0,
    },
    profileUrl: "any_url",
    username: "any_username",
    email: "any_email",
    photoUrl: "any_url",
    techs: ["tech1", "tech2"]
}

export const userMock: User = {
    id: 'any_id',
    position: {
        geohash: 'any_geohash',
        location: {
            latitude: 0.0,
            longitude: 0.0
        },
    },
    profileUrl: 'any_url',
    username: 'any_username',
    email: 'any_email',
    photoUrl: 'any_url',
    techs: ["tech1", "tech2"]
}