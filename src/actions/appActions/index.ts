import { alertError } from "_/helpers"
import { addUser } from "_/store/authStore"
import { AppThunk } from "_/types"

export const onAppLoaded = (): AppThunk => {
    return async (dispatch, getState, { userService }) => {
        try {
            const { auth } = getState()
            const { user } = auth

            if (!user) return

            const updatedPosition = await userService.getUserPosition()
            const newUser = { ...user, position: updatedPosition }

            dispatch(addUser(newUser))

            await userService.updateUser(newUser)

        } catch (err) {
            console.error(err)
            alertError("Não foi posível atualizar posição atual.")
        }
    }
}