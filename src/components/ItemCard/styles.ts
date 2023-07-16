import { StyleSheet } from "react-native";
import { Colors } from "../../theme/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        borderRadius: 8,
        marginBottom: 16,
        padding: 14,
        justifyContent: "space-between",
        flexDirection: 'row'
    },
    icon: {
        width: 30,
        height: 30,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: Colors.yellow.one,
    },
    isChecked: {
        backgroundColor: Colors.yellow.one,
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    strikeThrough: {
        textDecorationLine: "line-through",
        textDecorationColor: Colors.black,
    },
    rightButton: {
        backgroundColor: Colors.red.one,
        width: 40,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});
