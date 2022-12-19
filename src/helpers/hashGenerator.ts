import { geohashForLocation, geohashQueryBounds, Geopoint } from "geofire-common";
import { LatLng } from "_/types";

export const generateGeoHash = (latitude: number, longitude: number) => {
    return geohashForLocation([latitude, longitude]);
}

export const generateHashBounds = (location: LatLng, radiusInM: number) => {
    const center = [location.latitude, location.longitude] as Geopoint
    return geohashQueryBounds(center, radiusInM)
}
