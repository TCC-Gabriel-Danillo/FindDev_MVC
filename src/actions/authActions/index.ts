import { Alert } from "react-native"
import { mapAuthResponseToUser } from "_/helpers"
import { addUser, authLoaded, authLoading } from "_/store/authStore"
import { AuthCredentials } from "_/types"
import { AppThunk } from "_/types/appThunk"

export const authenticateAction = (credentials: AuthCredentials): AppThunk => {
    return async (dispatch, getState, { authService, userService }) => {
        try {
            dispatch(authLoading())
            const authResponse = await authService.authenticateGithub(credentials)
            if (!authResponse) throw new Error("Erro na autenticação com Git.")

            const position = await userService.getUserPosition()
            const newUser = mapAuthResponseToUser(authResponse, position)

            dispatch(addUser(newUser))
            await userService.createUser(newUser)
        } catch (err) {
            console.error(err)
            Alert.alert("Algo deu errado ao tentar logar.")
        } finally {
            dispatch(authLoaded())
        }
    }
}

export const logoutAction = (): AppThunk => {
    return (dispatch) => {
        dispatch(addUser())
    }
}








