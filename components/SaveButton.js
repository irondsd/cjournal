import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { secondaryColor, secondaryGrey } from '../constants'

let disabled = false

export default class SaveButton extends Component {
    onPress = () => {
        if (!disabled) {
            disabled = true
            this.props.onPress()
        }

        setInterval(() => {
            disabled = false
        }, 500)
    }

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
                onPress={this.onPress}>
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
        marginTop: 5,
        marginBottom: 5,
    },
    text: {
        fontSize: 17,
        color: 'white',
    },
})
