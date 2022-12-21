import { LocationAdapterImp } from "_/adapters";
import { FIREBASE_COLLECTION } from "_/constants";
import { DatabaseRepositoryImp } from "_/repositories";
import { UserService, UserServiceImp } from "_/services/userService";

export const makeUserService = (): UserService => {
    const locationAdatper = new LocationAdapterImp()
    const userDatabaseRepository = new DatabaseRepositoryImp(FIREBASE_COLLECTION.USERS)
    return new UserServiceImp(locationAdatper, userDatabaseRepository)
}