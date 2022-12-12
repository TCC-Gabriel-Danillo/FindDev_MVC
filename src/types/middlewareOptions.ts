import { AuthService } from "_/services/authService"
import { UserService } from "_/services/userService"

export type ThunkArgs = {
    authService: AuthService
    userService: UserService
}

export type MiddlewareOptions = {
    thunk: {
        extraArgument: ThunkArgs
    },
    serializableCheck: boolean
}