import React, { Component } from 'react'
import { StyleSheet, Text, TextInput } from 'react-native'
import { strings } from '../localizations'

export default class Comment extends Component {
    render() {
        return (
            <TextInput
                placeholder={strings.Comment}
                multiline={true}
                maxLength={80}
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={true}
                returnKeyType="next"
                onChangeText={text => {
                    this.props.onChangeText(text)
                }}
                onEndEditing={
                    this.props.onEndEditing
                        ? text => {
                              this.props.onEndEditing(text)
                          }
                        : null
                }
                value={this.props.comment}
            />
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        fontSize: 17,
        paddingLeft: 15,
        lineHeight: 30,
        paddingRight: 15,
        height: 50,
        backgroundColor: 'white',
    },
})
