import { Dispatch } from "@reduxjs/toolkit"
import { addUser, authLoaded, authLoading } from "_/store/authStore"

export const authenticateAction = () => {
    return (dispatch: Dispatch) => {
        dispatch(authLoading())
        dispatch(addUser({
            geohash: "geohash", 
            id: 100, 
            position: {
                latitude: 0, 
                longitude: 0, 
            }, 
            profileUrl: "profileUrl", 
            username: "username", 

        }))
        dispatch(authLoaded())
    }
}