import { DatabaseRepository, HttpRepository } from "_/repositories"

export type ThunkArgs = {
    gitHubApi: HttpRepository,
    gitHubAuthApi: HttpRepository,
    userDatabaseRepository: DatabaseRepository
}

export type MiddlewareOptions = {
    thunk: {
        extraArgument: ThunkArgs
    }
}