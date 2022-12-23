import { UserService } from "_/services/userService";
import { LatLng, User, Position } from "_/types";


const mockedPosition = {
    geohash: "any_hash",
    location: {
        latitude: 99.99999,
        longitude: 99.99999
    }
}

const mockedAuthedUser: User = {
    id: "any_id",
    username: "any_username",
    profileUrl: "any_profile_url",
    photoUrl: "any_photo_url",
    email: "any_email",
    techs: ["tech_1", "tech_2"],
    position: mockedPosition
}

const mockedUser: User = {
    id: "any_id_2",
    username: "any_username_2",
    profileUrl: "any_profile_url_2",
    photoUrl: "any_photo_url_2",
    email: "any_email_2",
    techs: ["tech_1", "tech_2"],
    position: mockedPosition
}

export class UserServiceStub implements UserService {
    async listUsersByDistance(location: LatLng, distanceInM: number) {
        return Promise.resolve([mockedAuthedUser, mockedUser])
    }

    async getUserPosition(): Promise<Position> {
        return Promise.resolve(mockedPosition)
    }
    async createUser(user: User) {
        return Promise.resolve()
    }
    async updateUser(user: User) {
        return Promise.resolve()
    }

}