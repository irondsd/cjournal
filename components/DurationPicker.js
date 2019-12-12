import React, { Component } from 'react'
import { View, Text, StyleSheet, Picker } from 'react-native'
import { durations } from '../properties'
import { strings } from '../localizations'
import { localTime } from '../helpers/dateTime'
import { sortNumbers } from '../helpers/sort'

export default class componentName extends Component {
    durationItems() {
        let items = []
        let durs = [...durations] // clone to preserve original
        if (this.props.addDuration) {
            durs.push(this.props.addDuration)
            durs = sortNumbers(durs)
        }

        for (var i in durs) {
            items.push(<Picker.Item label={localTime(durs[i])} value={durs[i]} key={i} />)
        }

        return items
    }

    onChange(itemValue) {
        this.setState({
            duration: itemValue
        })
        this.props.handler(itemValue)
    }

    render() {
        return (
            <View>
                <Picker
                    selectedValue={this.props.duration}
                    style={styles.picker}
                    onValueChange={itemValue => this.onChange(itemValue)}
                    enabled={!this.props.disabled}
                >
                    {this.durationItems()}
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
