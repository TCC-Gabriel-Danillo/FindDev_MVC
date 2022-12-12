import {
    Ionicons,
} from '@expo/vector-icons';

import { COLORS } from './colors';

interface IconProps {
    size?: number
    color?: string
}
export const ICONS = {
    LOGOUT: ({ color = COLORS.DARK, size = 24 }: IconProps) => <Ionicons name="md-log-out" size={size} color={color} />,
}

export type ICON = typeof ICONS[keyof typeof ICONS]