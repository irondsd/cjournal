import { StyleSheet } from 'react-native'
import { backgroundColor } from './colors'

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
})
