import React, { FC, useState, useEffect } from 'react'
import { View } from 'react-native'
import { TimePicker } from './TimePicker'
import { TimeSwitch, TimeSwitchValues } from './TimeSwitch'
import { DurationPicker } from './DurationPicker'

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
    const [from, setFrom] = useState<TimeSwitchValues>(
        TimeSwitchValues.fromStart,
    )
    const [duration, setDuration] = useState<number>(0)
    const [started, setStarted] = useState<number>(time_started)
    const [ended, setEnded] = useState<number | undefined>(time_ended)

    useEffect(() => {
        if (from === TimeSwitchValues.fromStart) {
            setStarted(time_started)
            setEnded(duration ? time_started + duration * 60 : undefined)
        } else {
            setStarted(duration ? time_started - duration * 60 : time_started)
            setEnded(time_ended)
        }
    }, [from])

    useEffect(() => {
        if (from === TimeSwitchValues.fromStart)
            setEnded(duration ? time_started + duration * 60 : undefined)
        else setStarted(duration ? time_started - duration * 60 : time_started)
    }, [duration])

    useEffect(() => {
        if (time_started !== started && time_ended !== ended)
            onChange(started, ended)
    }, [started, ended])

    useEffect(() => {
        if (started !== time_started) setStarted(time_started)
    }, [time_started])

    useEffect(() => {
        if (ended !== time_ended) {
            setEnded(time_ended)
            if (time_ended)
                setDuration(
                    parseInt(((time_ended! - time_started) / 60).toFixed(0)),
                )
        }
    }, [time_ended])

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
