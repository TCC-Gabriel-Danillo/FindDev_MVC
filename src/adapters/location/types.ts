import { Position } from "_/types"

export interface LocationAdapter {
    requestPermission: () => Promise<boolean>
    getCurrentPosition: () => Promise<Position>
}