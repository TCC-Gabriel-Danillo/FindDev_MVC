import { StyleSheet } from "react-native"
import { COLORS, SCREEN_DIMENSSIONS } from '_/constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: SCREEN_DIMENSSIONS.SCREEN_WIDTH,
        height: SCREEN_DIMENSSIONS.SCREEN_HEIGHT,
    },
    imageMarker: {
        width: 60,
        height: 60,
        resizeMode: "contain",
        borderRadius: 50,
        borderWidth: 5,
        borderColor: COLORS.PRIMARY
    },
    logoutButton: {
        position: "absolute",
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        bottom: '5%',
        right: '5%'
    },
    calloutView: { width: 250 },
    calloutTitle: { marginLeft: 10, textAlign: "center" },
    calloutContent: { fontSize: 12 },
    calloutImage: { flexDirection: "row", alignItems: "center", marginBottom: 10 }
});