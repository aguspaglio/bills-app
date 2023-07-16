import { StyleSheet } from "react-native";
import { Colors } from "../../../theme/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "flex-end",
    },
    content: {
        flex: 1,
    },
    cardShopList: {
        backgroundColor: Colors.yellow.one,
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    qtyContainer: {
        backgroundColor: Colors.black,
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    counter: {
        position: 'absolute',
        right: -3,
        top: -3,
        backgroundColor: Colors.yellow.three,
        height: 14,
        width: 14,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
