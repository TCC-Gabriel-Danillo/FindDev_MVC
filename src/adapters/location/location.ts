import { Position } from "_/types";
import { LocationAdapter } from "./types";
import * as Location from 'expo-location';
import { geohashGeneratorHelper } from "_/helpers";

export class LocationAdapterImp implements LocationAdapter {
    async requestPermission() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        return status === Location.PermissionStatus.GRANTED
    }

    async getCurrentPosition(): Promise<Position> {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords
        return {
            latitude,
            longitude,
            geohash: geohashGeneratorHelper(latitude, longitude)
        }
    }

}