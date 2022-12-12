import { StyleSheet } from "react-native"
import { COLORS } from "_/constants"

export const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.PRIMARY,
        width: "100%",
        height: 40,
        alignItems: "center",
        padding: 10,
        borderRadius: 5
    },
    buttonText: {
        color: COLORS.WHITE,
    }
})