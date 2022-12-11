import { geohashForLocation } from "geofire-common";
import { Position } from "_/types";

export const geohashGeneratorHelper = (position: Position) => {
    const { latitude, longitude } = position
    return geohashForLocation([latitude, longitude]);
}
