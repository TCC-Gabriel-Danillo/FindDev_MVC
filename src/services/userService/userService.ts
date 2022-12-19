import { LocationAdapter } from "_/adapters";
import { mapFirebaseUserToUser } from "_/helpers";
import { mapUserToFirebaseUser } from "_/helpers/mapUserToFirebaseUser";
import { DatabaseRepository, QueryOptions } from "_/repositories";
import { User, LatLng } from "_/types";
import { FirebaseUserDto } from "./dto";
import { UserService } from "./types";
import _ from "lodash"

export class UserServiceImp implements UserService {
    constructor(
        private readonly locationAdatper: LocationAdapter,
        private readonly userDatabaseRepository: DatabaseRepository
    ) { }

    async listUsersByDistance(location: LatLng, distanceInM: number): Promise<User[]> {
        const bounds = this.locationAdatper.generateGeoHashBounds(location, distanceInM)
        const promisses = []

        for (let b of bounds) {
            const [boundStart, boundEnd] = b
            const args: QueryOptions = {
                orderArgs: {
                    field: "position.geohash",
                    startAt: boundStart,
                    entAt: boundEnd
                }
            }
            promisses.push(this.userDatabaseRepository.getAll<FirebaseUserDto>(args))

        }
        const fUsers = _.flatMapDeep(await Promise.all(promisses))
        return fUsers.map(fUser => mapFirebaseUserToUser(fUser))
    }

    async getUserPosition() {
        const isPermisstionGranted = await this.locationAdatper.requestPermission()
        if (!isPermisstionGranted) throw new Error("Permission not granted.")
        const position = await this.locationAdatper.getCurrentPosition()
        return position
    }

    async createUser(user: User) {
        const fUser = mapUserToFirebaseUser(user)
        await this.userDatabaseRepository.createOrReplace(fUser, fUser.id)
    }

    async updateUser(user: User) {
        const fUser = mapUserToFirebaseUser(user)
        await this.userDatabaseRepository.update(fUser, fUser.id)
    }

} 