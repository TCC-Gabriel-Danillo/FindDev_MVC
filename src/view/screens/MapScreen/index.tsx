import React, { useCallback, useEffect } from 'react';
import MapView, { Marker, Callout, Region } from 'react-native-maps';
import { Image, View } from 'react-native';
import { Button, Text } from '_/view/components';
import makerImg from "_/assets/marker.png"
import { styles } from "./styles"
import * as Linking from 'expo-linking';
import { COLORS, ICONS, TEST_ID } from '_/constants';
import { User } from '_/types';
import { useAppDispatch, useAuthSelector, useUsersSelector } from '_/hooks';
import { logoutAction } from '_/actions/authActions';
import { getUsersAction } from '_/actions/usersActions';

export function MapScreen() {
    const { user: authUser } = useAuthSelector()
    const { users } = useUsersSelector()
    const dispatch = useAppDispatch()

    const initialRegion = {
        latitude: Number(authUser?.position.location.latitude),
        longitude: Number(authUser?.position.location.longitude),
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    }

    const handleCalloutPress = useCallback(async (user: User) => {
        await Linking.openURL(user.profileUrl);
    }, [])

    const signOutUser = useCallback(() => {
        dispatch(logoutAction())
    }, [dispatch, logoutAction])

    const onReagionChange = useCallback((region: Region) => {
        const { latitude, longitude } = region
        dispatch(getUsersAction({ latitude, longitude }))
    }, [dispatch, getUsersAction])

    useEffect(() => {
        const { latitude, longitude } = initialRegion
        dispatch(getUsersAction({ latitude, longitude }))
    }, [])


    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                onRegionChangeComplete={onReagionChange}
                initialRegion={initialRegion}
                maxZoomLevel={14}
                minZoomLevel={3.5}
                testID={TEST_ID.MAP}
            >
                {
                    users.map(user => {
                        return (
                            <Marker
                                testID={TEST_ID.MAP_MARKER}
                                key={user.id}
                                coordinate={{
                                    latitude: user.position.location.latitude,
                                    longitude: user.position.location.longitude
                                }}
                                image={makerImg}
                            >

                                <Callout onPress={function () { handleCalloutPress(user) }} testID={TEST_ID.MAP_CALLOUT}>
                                    <View style={styles.calloutView}>
                                        <View style={styles.calloutImage}>
                                            <Image source={{ uri: user.photoUrl }} style={styles.imageMarker} />
                                            <Text fontWeight='bold' style={styles.calloutTitle}>{user.username}</Text>
                                        </View>
                                        <Text style={styles.calloutContent}>Techs: {user.techs?.join(", ")}</Text>
                                        {user.email && <Text style={styles.calloutContent}>Email: {user.email}</Text>}
                                    </View>
                                </Callout>
                            </Marker>
                        )
                    })
                }
            </MapView>
            <Button onPress={signOutUser} style={styles.logoutButton} testID={TEST_ID.LOGOUT_BUTTON}>
                <ICONS.LOGOUT size={32} color={COLORS.WHITE} />
            </Button>
        </View>
    );
}