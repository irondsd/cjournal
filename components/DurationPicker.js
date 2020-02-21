import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Picker,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import { durations } from '../properties'
import { strings } from '../localizations'
import { localTime } from '../helpers/dateTime'
import { sortNumbers } from '../helpers/sort'
// import DurationSelect from './DurationSelect'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

let maxLines = 5

export default class DurationPicker extends Component {
    state = {
        value: 0,
        droppedDown: false,
        list: [],
    }

    durationItems() {
        let items = []
        let durs = [...durations] // clone to preserve original
        if (this.props.addDuration) {
            durs.push(this.props.addDuration)
            durs = sortNumbers(durs)
        }

        return durs
    }

    componentDidMount() {
        this.setState({
            droppedDown: this.props.open,
            list: this.durationItems(),
            value: this.props.value,
        })

        if (this.props.maxLines) maxLines = this.props.maxLines
    }

    onSelect = value => {
        this.setState({
            value: value,
            droppedDown: true,
        })

        this.props.handler(value)
    }

    dropDown = () => {
        this.setState({
            droppedDown: !this.state.droppedDown,
        })
    }

    popUpRender = () => {
        let array = this.state.list
        console.log(this.state)
        return [
            array.map((el, index) => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            this.onSelect(el)
                            this.setState({ droppedDown: false })
                        }}
                        key={index}>
                        <Text style={styles.popUpText}>{localTime(el)}</Text>
                    </TouchableOpacity>
                )
            }),
        ]
    }

    onChange = itemValue => {
        this.setState({
            duration: itemValue,
        })
        this.props.handler(itemValue)
    }

    render() {
        let popUpHeight = 200

        if (this.state.list.length < maxLines)
            popUpHeight = this.state.list.length * 40

        if (this.props.value === undefined) return null

        return (
            <View style={styles.container}>
                <View style={styles.duration}>
                    <Text
                        style={styles.text}>{`${strings['Duration']}: `}</Text>
                </View>
                <View style={styles.select}>
                    <TouchableOpacity
                        activeOpacity={100}
                        style={styles.input}
                        onPress={this.dropDown}>
                        {this.props.value === '' && (
                            <Text style={styles.placeholder}></Text>
                        )}
                        <Text style={styles.Text}>
                            {localTime(this.props.value)}
                        </Text>
                    </TouchableOpacity>
                    <Icon
                        style={styles.iconDown}
                        name={
                            this.state.droppedDown ? 'angle-up' : 'angle-down'
                        }
                        size={30}
                        onPress={this.dropDown}
                        color={this.state.droppedDown ? '#aaa' : '#ddd'}
                    />
                    {this.state.droppedDown && (
                        <ScrollView
                            style={[styles.popUp, { height: popUpHeight }]}>
                            {this.popUpRender()}
                        </ScrollView>
                    )}
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
        width: '40%',
    },
    text: {
        fontSize: 17,
        top: 13,
    },
    select: {
        width: '60%',
    },
    View: {
        // backgroundColor: 'white',
        width: '100%',
    },
    input: {
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        paddingLeft: 15,
        paddingRight: 15,
        height: 50,
        backgroundColor: 'white',
    },
    Text: {
        flex: 1,
        top: 13,
        fontSize: 17,
        color: '#000',
    },
    placeholder: {
        flex: 1,
        top: 13,
        fontSize: 17,
        color: '#ddd',
    },
    iconDown: {
        position: 'absolute',
        right: 0,
        top: 10,
        height: 50,
        width: 30,
    },
    popUp: {
        position: 'absolute',
        zIndex: 10000,
        top: 49,
        bottom: 0,
        width: '100%',
        height: 200,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: 'white',
    },
    popUpText: {
        fontSize: 17,
        lineHeight: 40,
        color: '#888',
    },
})
