import { Dispatch } from "@reduxjs/toolkit"
import { addUsers } from "_/store/usersStore"
import { AppThunk } from "_/types"

export const getUsersAction = (): AppThunk => {
    return (dispatch: Dispatch, getState, { userService }) => {
        dispatch(addUsers([
            {
                id: 100,
                position: {
                    latitude: 0,
                    longitude: 0,
                    geohash: "",
                },
                profileUrl: "profileUrl",
                username: "username",

            }
        ]))
    }
}
