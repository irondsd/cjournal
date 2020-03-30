import React, { Component } from 'react'
import { StyleSheet, Text, TextInput } from 'react-native'
import { strings } from '../localizations'
import { borderGrey, secondaryGrey, placeholderGrey } from '../constants'

export default class Comment extends Component {
    render() {
        return (
            <TextInput
                placeholder={strings.Comment}
                multiline={false}
                maxLength={80}
                placeholderTextColor={placeholderGrey}
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
        width: '100%',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: borderGrey,
        fontSize: 17,
        paddingLeft: 15,
        lineHeight: 30,
        paddingRight: 15,
        height: 50,
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 5,
    },
})
