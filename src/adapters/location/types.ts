import { Position, LatLng } from "_/types"

export interface LocationAdapter {
    requestPermission: () => Promise<boolean>
    getCurrentPosition: () => Promise<Position>
    generateGeoHashBounds: (location: LatLng, distanceInM: number) => Bounds
}

type GeopHash = string;
type GeoHashRange = [GeopHash, GeopHash]
export type Bounds = [GeoHashRange, GeoHashRange]