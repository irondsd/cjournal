import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Text } from 'react-native'
import { borderGrey, secondaryGrey, placeholderGrey } from '../constants'
import { strings } from '../localizations'

export default class CaloriesInput extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.Text}>{strings.Calories}:</Text>
                <TextInput
                    // placeholder="Calories"
                    underlineColorAndroid="transparent"
                    style={styles.TextInputStyle}
                    keyboardType={'numeric'}
                    value={this.props.value}
                    onChangeText={this.props.onChangeText}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    TextInputStyle: {
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: borderGrey,
        paddingLeft: 15,
        paddingRight: 15,
        height: 50,
        backgroundColor: 'white',
        fontSize: 17,
        flex: 1,
    },
    Text: {
        flex: 1,
        top: 13,
        left: 10,
        fontSize: 17,
    },
    placeholder: {
        flex: 1,
        top: 13,
        fontSize: 17,
        color: placeholderGrey,
    },
})
