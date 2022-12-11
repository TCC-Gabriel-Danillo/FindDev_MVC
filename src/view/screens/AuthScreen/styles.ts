import { StyleSheet } from "react-native"
import { COLORS } from "_/constants"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.LIGHT,
        paddingHorizontal: 20
    },
    button: {
        marginTop: 10
    },
    subtitle: { textAlign: "center", marginTop: 10 },
    img: { width: 300, height: 300, resizeMode: "contain" }
})