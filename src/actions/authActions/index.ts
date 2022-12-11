import { mapAuthResponseToUser } from "_/helpers"
import { addUser } from "_/store/authStore"
import { AuthCredentials, Position, User } from "_/types"
import { AppThunk } from "_/types/appThunk"

export const authenticateAction = (credentials: AuthCredentials, position: Position): AppThunk => {

    return async (dispatch, getState, { authService, userDatabaseRepository }) => {

        const authResponse = await authService.authenticateGithub(credentials)
        if (!authResponse) throw new Error("Erro na autenticação com Git.")
        const newUser = mapAuthResponseToUser(authResponse, position)

        dispatch(addUser(newUser))

        const fUser = mapUserToFirebaseUser(newUser)
        await userDatabaseRepository.createOrReplace(fUser);
    }
}





export interface FirebaseUserDto {
    username: string
    id: number
    photoUrl?: string
    email: string
    techs?: Array<string>
}

export const mapUserToFirebaseUser = (user: User): FirebaseUserDto => {
    return {
        email: user.email || "",
        id: user.id,
        username: user.username,
        photoUrl: user.photoUrl,
        techs: user.techs
    }
}


