import { DatabaseRepository } from "_/repositories"
import { AuthService } from "_/services/authService"

export type ThunkArgs = {
    authService: AuthService
    userDatabaseRepository: DatabaseRepository
}

export type MiddlewareOptions = {
    thunk: {
        extraArgument: ThunkArgs
    }
}