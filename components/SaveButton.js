import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { secondaryColor, secondaryGrey } from '../constants'

export default class SaveButton extends Component {
    render() {
        let bColor
        !this.props.disabled
            ? (bColor = secondaryColor)
            : (bColor = secondaryGrey)
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.container, { backgroundColor: bColor }]}
                disabled={this.props.disabled}
                onPress={this.props.onPress}>
                <Text style={styles.text}>{this.props.title} </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: secondaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 5,
        padding: 15,
    },
    text: {
        fontSize: 17,
        color: 'white',
    },
})
