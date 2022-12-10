import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AuthScreen, MapScreen } from "_/view/screens"
import { NAVIGATION_SCREENS } from "_/constants"
import { useAuthSelector } from "_/hooks"

const Stack = createNativeStackNavigator()

export function Routes() {

    const { isAuthenticated } = useAuthSelector()

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