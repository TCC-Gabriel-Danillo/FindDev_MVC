import { Position } from "_/types";
import { LocationAdapter, Bounds } from "./types";
import * as Location from 'expo-location';
import { generateGeoHash, generateHashBounds } from "_/helpers";
import { LatLng } from "_/types";

export class LocationAdapterImp implements LocationAdapter {
    async requestPermission() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        return status === Location.PermissionStatus.GRANTED
    }

    async getCurrentPosition(): Promise<Position> {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords
        return {
            location: {
                latitude,
                longitude
            },
            geohash: generateGeoHash(latitude, longitude)
        }
    }

    generateGeoHashBounds(location: LatLng, distanceInM: number): Bounds {
        const bounds = generateHashBounds(location, distanceInM)
        return bounds
    }
}