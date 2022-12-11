import { mapAuthResponseToUser } from "_/helpers"
import { addUser } from "_/store/authStore"
import { AuthCredentials } from "_/types"
import { AppThunk } from "_/types/appThunk"

export const authenticateAction = (credentials: AuthCredentials): AppThunk => {

    return async (dispatch, getState, { authService, userService }) => {

        const authResponse = await authService.authenticateGithub(credentials)
        if (!authResponse) throw new Error("Erro na autenticação com Git.")

        const position = await userService.getUserPosition()
        const newUser = mapAuthResponseToUser(authResponse, position)

        dispatch(addUser(newUser))
        await userService.createUser(newUser)

    }
}








