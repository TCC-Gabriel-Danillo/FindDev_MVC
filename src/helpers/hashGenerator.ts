import { geohashForLocation } from "geofire-common";
import { Position } from "_/types";

export const geohashGeneratorHelper = (latitude: number, longitude: number) => {
    return geohashForLocation([latitude, longitude]);
}
