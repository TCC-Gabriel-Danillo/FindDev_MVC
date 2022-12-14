import { alertError } from "_/helpers"
import { addUser } from "_/store/authStore"
import { AppThunk } from "_/types"

export const onAppLoaded = (): AppThunk => {
    return async (dispatch, getState, { userService }) => {
        try {
            const { auth } = getState()
            const { user } = auth

            if (!user) return

            const position = await userService.getUserPosition()
            const newUser = { ...user, position }

            dispatch(addUser(newUser))

            await userService.updateUser(newUser)

        } catch (err) {
            console.error(err)
            alertError("Não foi posível atualizar posição atual.")
        }
    }
}