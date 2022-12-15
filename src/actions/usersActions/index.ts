import { Dispatch } from "@reduxjs/toolkit"
import { alertError } from "_/helpers";
import { addUsers, usersLoading, usersLoaded } from "_/store/usersStore"
import { AppThunk, LatLng } from "_/types"

const defaultDistanceInM = 10 * 1000;

export const getUsersAction = (location: LatLng): AppThunk => {
    return async (dispatch: Dispatch, getState, { userService }) => {
        try {
            const { auth: { user: authUser } } = getState()
            dispatch(usersLoading())
            const users = await userService.listUsersByDistance(location, defaultDistanceInM)
            const usersWithoutAuthed = users.filter(user => user.id !== authUser?.id)
            dispatch(addUsers(usersWithoutAuthed))

        } catch (err) {
            console.error(err)
            alertError("Algo deu errado ao recuperar usuários.")
        } finally {
            dispatch(usersLoaded())
        }
    }
}
