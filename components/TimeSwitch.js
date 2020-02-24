import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { strings } from '../localizations'

export default class TimeSwitch extends Component {
    state = {
        options: [strings.FromStart, strings.FromEnd],
    }

    swtitch = value => {
        this.props.onSelection(value)
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.swtitch(strings.FromStart)}
                    style={[
                        styles.button,
                        styles.buttonLeft,
                        this.props.value === strings.FromStart
                            ? styles.selected
                            : null,
                    ]}>
                    <Text
                        style={[
                            styles.text,
                            this.props.value === strings.FromStart
                                ? { color: '#000' }
                                : null,
                        ]}>
                        {strings.FromStart}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.swtitch(strings.FromEnd)}
                    style={[
                        styles.button,
                        styles.buttonRight,
                        this.props.value === strings.FromEnd
                            ? styles.selected
                            : null,
                    ]}>
                    <Text
                        style={[
                            styles.text,
                            this.props.value === strings.FromEnd
                                ? { color: '#000' }
                                : null,
                        ]}>
                        {strings.FromEnd}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
    },
    button: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLeft: {},
    selected: {
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        backgroundColor: 'white',
    },
    buttonRight: {},
    text: {
        fontSize: 17,
        color: '#888',
    },
})
