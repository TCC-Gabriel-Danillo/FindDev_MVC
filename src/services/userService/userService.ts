import { LocationAdapter } from "_/adapters";
import { mapUserToFirebaseUser } from "_/helpers/mapUserToFirebaseUser";
import { DatabaseRepository } from "_/repositories";
import { User } from "_/types";
import { UserService } from "./types";

export class UserServiceImp implements UserService {
    constructor(
        private readonly locationAdatper: LocationAdapter,
        private readonly userDatabaseRepository: DatabaseRepository
    ) { }

    async getUserPosition() {
        const isPermisstionGranted = await this.locationAdatper.requestPermission()
        if (!isPermisstionGranted) throw new Error("Permission not granted.")
        const position = await this.locationAdatper.getCurrentPosition()
        return position
    }

    async createUser(user: User) {
        const fUser = mapUserToFirebaseUser(user)
        await this.userDatabaseRepository.createOrReplace(fUser)
    }

} 