import React, { Component } from 'react'
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import { backgroundColor } from '../constants'
import { tileMargin } from '../constants/styles'

export default class aTileWrapper extends Component {
    render() {
        return (
            <SafeAreaView style={styles.activityBox}>
                {this.props.children}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    activityBox: {
        flexDirection: 'row',
        backgroundColor: backgroundColor,
        justifyContent: 'space-evenly',
        margin: tileMargin,
        marginBottom: tileMargin * 3,
    },
})
