import React, { Component } from 'react'
import { View, Text, StyleSheet, Picker } from 'react-native'

export default class PillPicker extends Component {
    items() {
        let list = this.props.list.map((value, index) => {
            return <Picker.Item label={value} value={value} key={index} />
        })
        return list
    }

    onChange(itemValue) {
        this.props.handler(itemValue)
    }

    render() {
        return (
            <View>
                <Picker
                    selectedValue={this.props.pill}
                    style={styles.picker}
                    onValueChange={itemValue => this.onChange(itemValue)}
                    enabled={!this.props.disabled}
                >
                    {this.items()}
                </Picker>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    picker: {
        height: 50,
        width: '100%'
    }
})
