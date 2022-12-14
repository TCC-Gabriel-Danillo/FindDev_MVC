import { Position, User, LatLng } from "_/types";

export interface UserService {
    listUsersByDistance: (location: LatLng, distanceInM: number) => Promise<User[]>
    getUserPosition: () => Promise<Position>
    createUser: (user: User) => Promise<void>
    updateUser: (user: User) => Promise<void>
}