import { StyleSheet, Dimensions } from 'react-native'
import { backgroundColor, borderGrey } from './colors'

// export const tileMargin = Dimensions.get('window').width / 50
export const tileMargin = Dimensions.get('window').height / 80
export const tileSize = Dimensions.get('window').width / 4.15
// export const tileSize = (Dimensions.get('window').height - 60 - 80) / 5.5
export const borderRadius = tileSize / 8
export const imgSize = tileSize * 0.7

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
