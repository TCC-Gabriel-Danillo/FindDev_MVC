import React, { useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AuthScreen, MapScreen } from "_/view/screens"
import { NAVIGATION_SCREENS } from "_/constants"
import { useAppDispatch, useAuthSelector } from "_/hooks"
import { onAppLoaded } from "_/actions"

const Stack = createNativeStackNavigator()

export function Routes() {

    const dispatch = useAppDispatch()
    const { isAuthenticated } = useAuthSelector()

    useEffect(() => {
        dispatch(onAppLoaded())
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isAuthenticated ?
                    <Stack.Screen name={NAVIGATION_SCREENS.MAP_SCREEN} component={MapScreen} /> :
                    <Stack.Screen name={NAVIGATION_SCREENS.AUTH_SCREEN} component={AuthScreen} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}