import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AuthScreen, MapScreen } from "_/view/screens"
import { NAVIGATION_SCREENS } from "_/constants"

const Stack = createNativeStackNavigator()

export function Routes(){
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name={NAVIGATION_SCREENS.AUTH_SCREEN} component={AuthScreen} />
                <Stack.Screen name={NAVIGATION_SCREENS.MAP_SCREEN} component={MapScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}