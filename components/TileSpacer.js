import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { tileMargin, tileSize } from '../constants/styles'

export default class aTile extends Component {
    render() {
        return <View style={styles.container}></View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: tileSize,
        marginLeft: tileMargin,
        marginRight: tileMargin,
    },
})
