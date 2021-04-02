import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { tileMargin, tileSize } from '../constants/styles'

export const TileSpacer: FC = () => {
    return <View style={styles.container} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: tileSize,
        marginLeft: tileMargin,
        marginRight: tileMargin,
    },
})
