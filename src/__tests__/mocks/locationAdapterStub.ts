import { Bounds, LocationAdapter } from "_/adapters";
import { Position, LatLng } from "_/types";

export class LocationAdapterStub implements LocationAdapter {
    requestPermission(): Promise<boolean> {
        return Promise.resolve(true)
    }
    getCurrentPosition(): Promise<Position> {
        return Promise.resolve({
            geohash: 'any_hash',
            location: {
                latitude: 0.0,
                longitude: 0.0
            }
        })
    }
    generateGeoHashBounds(location: LatLng, distanceInM: number): Bounds {
        return [['', ''], ['', '']]
    };

}