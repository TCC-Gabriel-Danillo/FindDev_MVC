import { useEffect } from "react"
import { View, Text } from "react-native"
import * as usersActions from "_/actions/usersActions"
import { useUsersSelector } from "_/hooks"
import { useAppDispatch } from "_/hooks/useAppDispatch"

export function AuthScreen(){
    
    const { users } = useUsersSelector()
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