import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { backgroundColor } from '../properties'

export default class TileWrapper extends Component {
    render() {
        return <View style={styles.activityBox}>{this.props.children}</View>
    }
}

const styles = StyleSheet.create({
    activityBox: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: backgroundColor,
        justifyContent: 'center',
    },
})
