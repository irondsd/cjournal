import React, { Component } from 'react'
import {
    Text,
    View,
    Switch,
    StyleSheet,
    Platform,
    TextInput,
} from 'react-native'
import {
    secondaryColor,
    placeholderGrey,
    secondaryGrey,
    borderGrey,
} from '../constants'

export default class NumInput extends Component {
    state = {
        value: 30,
    }

    onValueChange = value => {
        if (value === '') return this.props.onValueChange(1)

        if (/^\d+$/.test(value.toString())) {
            if (value < 1) {
                this.DelayInput.focus()
                this.props.onValueChange(1)
            } else if (value > 240) {
                this.DelayInput.focus()
                this.props.onValueChange(240)
            } else {
                this.props.onValueChange(parseInt(value))
            }
        }
    }

    render() {
        return (
            <View style={styles.View}>
                <Text style={styles.Text}>{this.props.text}</Text>
                <View style={styles.border}>
                    <TextInput
                        onChangeText={this.onValueChange}
                        style={styles.Input}
                        value={this.props.value}
                        keyboardType={'numeric'}
                        ref={input => (this.DelayInput = input)}
                        selectTextOnFocus
                    />
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    View: {
        width: '100%',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
    },
    Text: {
        fontSize: 17,
        width: '100%',
        flex: 1,
        flexShrink: 0,
    },
    border: {
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: borderGrey,
    },
    Input: {
        fontSize: 17,
    },
})
