import { StyleSheet } from 'react-native'
import Constants from "expo-constants"
import { Colors } from '../../../theme/colors'

const STATUS_BAR_HEIGHT = Constants.statusBarHeight

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.grey.one,
        paddingBottom: 72,
        // paddingTop: STATUS_BAR_HEIGHT,
    },
    inputContainer: {
        flexDirection: 'row',
        width: '100%',
        padding: 16
    },
    addButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.black,
        borderRadius: 8,
        flex: 0.1,
        minWidth: 16
    },
    listContainer: {
        paddingHorizontal: 16,
    },
    suggestionsContainer: {
        width: '100%',
        borderRadius: 8,
        paddingHorizontal: 16,
    },
    suggestion: {
        padding: 10,
    },
    suggestions: {
        borderRadius: 8,
        backgroundColor: Colors.black,
    },
    emptyState: {
        backgroundColor: Colors.yellow.one,
        flex: 1,
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})