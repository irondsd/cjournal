import React, { Component } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { backgroundColor } from '../constants'

export default class TileWrapper extends Component {
    // measureView = event => {
    //     console.log(event.nativeEvent.layout.height)
    // }
    render() {
        return (
            <SafeAreaView
                // onLayout={this.measureView}
                style={styles.activityBox}>
                {this.props.children}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    activityBox: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: backgroundColor,
        justifyContent: 'center',
    },
})
