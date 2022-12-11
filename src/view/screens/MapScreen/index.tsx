import React from 'react';
import MapView, { Marker, Callout, Region } from 'react-native-maps';
import { Image, View } from 'react-native';
import { Button, Text } from '_/view/components';
import makerImg from "_/assets/marker.png"
import { styles } from "./styles"
import * as Linking from 'expo-linking';
import { COLORS, ICONS } from '_/constants';
import { User } from '_/types';
import { useAppDispatch, useAuthSelector, useUsersSelector } from '_/hooks';
import { logoutAction } from '_/actions/authActions';

export function MapScreen() {
    const { user: authUser } = useAuthSelector()
    const { users } = useUsersSelector()
    const dispatch = useAppDispatch()

    const handleCalloutPress = async (user: User) => {
        await Linking.openURL(user.profileUrl);
    }

    const signOutUser = () => {
        dispatch(logoutAction())
    }


    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                onRegionChangeComplete={(region: Region) => {
                    const { latitude, longitude } = region
                }}
                initialRegion={{
                    latitude: Number(authUser?.position.latitude),
                    longitude: Number(authUser?.position.longitude),
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                maxZoomLevel={14}
                minZoomLevel={3.5}
            >
                {
                    users.map(user => {
                        return (
                            <Marker
                                key={user.id}
                                coordinate={{
                                    latitude: user.position.latitude,
                                    longitude: user.position.longitude
                                }}
                                image={makerImg}
                            >

                                <Callout onPress={() => handleCalloutPress(user)}>
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
            <Button onPress={signOutUser} style={styles.logoutButton}>
                <ICONS.LOGOUT size={32} color={COLORS.WHITE} />
            </Button>
        </View>
    );
}