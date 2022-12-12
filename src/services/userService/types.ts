import { Position, User } from "_/types";

export interface UserService {
    getUserPosition: () => Promise<Position>
    createUser: (user: User) => Promise<void>
}