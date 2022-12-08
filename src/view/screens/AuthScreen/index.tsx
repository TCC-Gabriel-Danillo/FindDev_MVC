import { useEffect } from "react"
import { View, Text } from "react-native"
import * as usersActions from "_/actions/usersAction"
import { useAppDispatch } from "_/hooks/useAppDispatch"
import { useAppSelector } from "_/hooks/useAppSelector"

export function AuthScreen(){
    const { users } = useAppSelector((state) => state.usersState)
    const dispatch = useAppDispatch()
    
    console.log({ users })

    useEffect(() => {
        dispatch(usersActions.getUsersAction())
    }, [])

    return(
        <View>
            <Text>Auth Screen</Text>
        </View>
    )
}