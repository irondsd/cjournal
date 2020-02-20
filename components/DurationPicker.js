import React, { Component } from 'react'
import { View, Text, StyleSheet, Picker } from 'react-native'
import { durations } from '../properties'
import { strings } from '../localizations'
import { localTime } from '../helpers/dateTime'
import { sortNumbers } from '../helpers/sort'
import DurationSelect from './DurationSelect'

export default class componentName extends Component {
    durationItems() {
        let items = []
        let durs = [...durations] // clone to preserve original
        if (this.props.addDuration) {
            durs.push(this.props.addDuration)
            durs = sortNumbers(durs)
        }

        // for (var i in durs) {
        //     items.push(
        //         <Picker.Item
        //             label={localTime(durs[i])}
        //             value={durs[i]}
        //             key={i}
        //         />,
        //     )
        // }

        return durs
    }

    onChange = itemValue => {
        this.setState({
            duration: itemValue,
        })
        this.props.handler(itemValue)
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <Picker
                    selectedValue={this.props.duration}
                    style={styles.picker}
                    onValueChange={itemValue => this.onChange(itemValue)}
                    enabled={!this.props.disabled}
                >
                    {this.durationItems()}
                </Picker> */}
                <View style={styles.duration}>
                    <Text style={styles.text}>{'Duration: '}</Text>
                </View>
                <View style={styles.select}>
                    <DurationSelect
                        list={this.durationItems()}
                        // open={true}
                        onSelect={this.onChange}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    duration: {
        width: '25%',
    },
    text: {
        fontSize: 17,
        top: 13,
    },
    select: {
        width: '75%',
    },
})
