import React, { FC } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { backgroundColor } from '../../constants'
import { tileMargin } from '../../constants/styles'

export const TileLine: FC = ({ children }) => {
    return <SafeAreaView style={styles.tileLine}>{children}</SafeAreaView>
}

const styles = StyleSheet.create({
    tileLine: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: tileMargin,
        marginBottom: tileMargin * 3,
    },
})
