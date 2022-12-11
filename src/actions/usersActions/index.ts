import { Dispatch } from "@reduxjs/toolkit"
import { addUsers } from "_/store/usersStore"

export const getUsersAction = () => {
    return (dispatch: Dispatch) => {
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
