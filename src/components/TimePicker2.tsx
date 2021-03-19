import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { displayDate, displayTime } from '../helpers/dateTime'
import { strings } from '../localization'
import { borderGrey, secondaryGrey } from '../constants'
import timestamp from '../helpers/timestamp'

interface TimePickerProps {
    time: number
    disabled?: boolean
    onChange: (dateTime: number) => void
}

export const TimePicker = ({
    time = timestamp(),
    disabled,
    onChange,
}: TimePickerProps) => {
    const [dateTime, setDateTime] = useState<Date>(new Date(time * 1000))
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [mode, setMode] = useState<'date' | 'time'>('date')

    const handleTimePicked = (time: Date) => {
        setShowDatePicker(false)
        const newDateTime = new Date(dateTime.getTime())
        newDateTime.setHours(
            time.getHours(),
            time.getMinutes(),
            time.getSeconds(),
        )
        setDateTime(newDateTime)
    }

    const handleDatePicked = (date: Date) => {
        setShowDatePicker(false)
        const newDateTime = new Date(dateTime.getTime())
        newDateTime.setFullYear(date.getFullYear())
        newDateTime.setMonth(date.getMonth())
        newDateTime.setDate(date.getDate())
        setDateTime(newDateTime)
    }

    useEffect(() => {
        onChange(timestamp(dateTime))
    }, [dateTime])

    return (
        <View style={styles.container}>
            <View style={styles.time}>
                <Text style={styles.timeText}>{strings.Time + ':'}</Text>
                <TouchableOpacity
                    onPress={() => {
                        setMode('date')
                        setShowDatePicker(true)
                    }}>
                    <Text style={styles.selectText}>
                        {displayDate(dateTime)}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.timeText}> {strings.at}</Text>
                <TouchableOpacity
                    onPress={() => {
                        setMode('time')
                        setShowDatePicker(true)
                    }}>
                    <Text style={styles.selectText}>
                        {displayTime(dateTime)}
                    </Text>
                </TouchableOpacity>
            </View>
            {!disabled && (
                <DateTimePicker
                    isVisible={showDatePicker}
                    onConfirm={value => {
                        if (mode === 'date') handleDatePicked(value)
                        else handleTimePicked(value)
                    }}
                    onCancel={() => setShowDatePicker(false)}
                    mode={mode}
                    date={dateTime}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { width: '100%', marginTop: 5, marginBottom: 5 },
    time: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
        marginBottom: 10,
    },
    timeText: {
        lineHeight: 50,
        fontSize: 17,
        color: secondaryGrey,
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
        backgroundColor: '#fff',
        color: '#000',
    },
})
