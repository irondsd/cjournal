import React, { FC, useState, useEffect } from 'react'
import { View } from 'react-native'
import timestamp from '../helpers/timestamp'
import { TimePicker } from './TimePicker2'
import { TimeSwitch, TimeSwitchValues } from './TimeSwitchTS'
import { DurationPicker } from './DurationPickerTS'

type TimePickCombinedProps = {
    time_started: number
    time_ended?: number
    onChange: (time_started: number, time_ended?: number) => void
}

export const TimePickCombined: FC<TimePickCombinedProps> = ({
    time_started,
    time_ended,
    onChange,
}) => {
    const [renderTime] = useState(timestamp())
    const [from, setFrom] = useState<TimeSwitchValues>(
        TimeSwitchValues.fromStart,
    )
    const [duration, setDuration] = useState<number>(0)
    const [started, setStarted] = useState<number>(time_started)
    const [ended, setEnded] = useState<number | undefined>(time_ended)

    useEffect(() => {
        if (from === TimeSwitchValues.fromStart) {
            setStarted(renderTime)
            setEnded(duration ? renderTime + duration * 60 : undefined)
        } else {
            setStarted(duration ? renderTime - duration * 60 : renderTime)
            setEnded(renderTime)
        }
    }, [from])

    useEffect(() => {
        if (from === TimeSwitchValues.fromStart)
            setEnded(duration ? renderTime + duration * 60 : undefined)
        else setStarted(duration ? renderTime - duration * 60 : renderTime)
    }, [duration])

    useEffect(() => {
        if (time_started !== started && time_ended !== ended)
            onChange(started, ended)
    }, [started, ended])

    useEffect(() => {
        if (started !== time_started) setStarted(time_started)
        if (ended !== time_ended) setEnded(time_ended)
    }, [time_started, time_ended])

    return (
        <View>
            <TimeSwitch onChange={setFrom} value={from} />
            <TimePicker
                time={time_started}
                onChange={value => setStarted(value)}
            />
            <DurationPicker
                onChange={value => setDuration(value)}
                value={duration}
            />
        </View>
    )
}
