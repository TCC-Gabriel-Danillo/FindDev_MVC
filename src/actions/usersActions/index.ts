import { Dispatch } from "@reduxjs/toolkit"
import { alertError } from "_/helpers";
import { addUsers, usersLoading, usersLoaded } from "_/store/usersStore"
import { AppThunk, LatLng } from "_/types"

const defaultDistanceInM = 10 * 1000;

export const getUsersAction = (location: LatLng): AppThunk => {
    return async (dispatch: Dispatch, getState, { userService }) => {
        try {
            dispatch(usersLoading())
            const users = await userService.listUsersByDistance(location, defaultDistanceInM)
            dispatch(addUsers(users))
        } catch (err) {
            console.error(err)
            alertError("Algo deu errado ao recuperar usuários.")
        } finally {
            dispatch(usersLoaded())
        }
    }
}
