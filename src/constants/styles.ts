import { StyleSheet, Dimensions } from 'react-native'
import { backgroundColor, borderGrey } from './colors'
export const { height, width } = Dimensions.get('window')
export const tileMargin = height / 80
export let tileSize = width / 4.15
if (height / width < 1.7) tileSize = (height - 60 - 80) / 5.5
export const borderRadius = tileSize / 4
export const imgSize = tileSize * 0.9
export const tileFontSize = width * 0.034
export const logoSize = Dimensions.get('window').width / 1.7
export const smileSize = width / 2.5

export const defaultStyles = StyleSheet.create({
    navScreen: {
        flex: 1,
        backgroundColor: backgroundColor,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
        flexDirection: 'column',
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
