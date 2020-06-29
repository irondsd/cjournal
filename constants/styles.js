import { StyleSheet, Dimensions } from 'react-native'
import { backgroundColor, borderGrey } from './colors'
export const { height, width } = Dimensions.get('window')
// export const tileMargin = Dimensions.get('window').width / 50
export const tileMargin = height / 80
export let tileSize = width / 4.15
if (height / width < 1.7) tileSize = (height - 60 - 80) / 5.5
export const borderRadius = tileSize / 8
export const imgSize = tileSize * 1
export const tileFontSize = width * 0.034

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
        flexDirection: 'column',
        // justifyContent: 'space-between',
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
