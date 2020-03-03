import { StyleSheet } from 'react-native'
import { backgroundColor, borderGrey } from './colors'

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        width: '100%',
    },
    border: {
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: borderGrey,
        paddingLeft: 10,
        height: 50,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 17,
    },
})
