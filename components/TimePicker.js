import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { displayDate, displayTime } from '../helpers/dateTime'
import { strings } from '../localizations'
import { borderGrey, secondaryGrey } from '../constants'

export default class TimePicker extends Component {
    state = {
        dateTime: new Date(),
        isTimePickerVisible: false,
        isDatePickerVisible: false,
    }

    componentDidMount() {
        this.setState({
            dateTime: this.props.dateTime,
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            dateTime: nextProps.dateTime,
        }
    }

    _showTimePicker = () => {
        if (!this.props.disabled) {
            this.setState({ isTimePickerVisible: true })
        }
    }
    _hideTimePicker = () => {
        if (!this.props.disabled) {
            this.setState({ isTimePickerVisible: false })
        }
    }
    _showDatePicker = () => {
        if (!this.props.disabled) {
            this.setState({ isDatePickerVisible: true })
        }
    }
    _hideDatePicker = () => {
        if (!this.props.disabled) {
            this.setState({ isDatePickerVisible: false })
        }
    }

    _handleDatePicked = dateTime => {
        this._hideDatePicker()
        this.props.handler(dateTime)
        this.setState({
            dateTime: dateTime,
        })
    }

    _handleTimePicked = dateTime => {
        this._hideTimePicker()
        newDateTime = this.state.dateTime
        newDateTime.setHours(
            dateTime.getHours(),
            dateTime.getMinutes(),
            dateTime.getSeconds(),
        )
        this.props.handler(newDateTime)
        this.setState({
            dateTime: dateTime,
        })
    }

    render() {
        return (
            <View>
                <View style={styles.time}>
                    <Text style={styles.timeText}>{strings.Time + ':'}</Text>
                    <TouchableOpacity onPress={this._showDatePicker}>
                        <Text style={styles.selectText}>
                            {displayDate(this.state.dateTime)}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.timeText}> {strings.at}</Text>
                    <TouchableOpacity onPress={this._showTimePicker}>
                        <Text style={styles.selectText}>
                            {displayTime(this.state.dateTime)}
                        </Text>
                    </TouchableOpacity>
                </View>
                <DateTimePicker
                    isVisible={this.state.isTimePickerVisible}
                    onConfirm={this._handleTimePicked}
                    onCancel={this._hideTimePicker}
                    mode="time"
                    date={this.state.dateTime}
                />
                <DateTimePicker
                    isVisible={this.state.isDatePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDatePicker}
                    mode="date"
                    date={this.state.dateTime}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    time: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    timeText: {
        lineHeight: 50,
        fontSize: 17,
        color: 'black',
        color: secondaryGrey,
        // textAlign: 'center',
    },
    selectText: {
        borderRadius: 5,
        lineHeight: 50,
        borderWidth: 0.5,
        borderColor: borderGrey,
        fontSize: 17,
        paddingLeft: 15,
        paddingRight: 15,
        height: 50,
        backgroundColor: 'white',
        color: 'black',
    },
})
