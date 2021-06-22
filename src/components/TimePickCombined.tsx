import React, { FC, useState, useEffect } from 'react'
import { View } from 'react-native'
import timestamp from '../helpers/timestamp'
import { TimePicker } from './TimePicker2'
import { TimeSwitch, TimeSwitchValues } from './TimeSwitchTS'
import { DurationPicker } from './DurationPickerTS'

type TimePickCombinedProps = {
    time_started: number
    time_ended: number
    onChange: (
        time_started: TimePair['time_started'],
        time_ended: TimePair['time_ended'],
    ) => void
}

type TimePair = {
    time_started: number
    time_ended: number | undefined
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
    const [time, setTime] = useState<TimePair>({
        time_started: time_started || renderTime,
        time_ended: time_ended,
    })

    useEffect(() => {
        if (from === TimeSwitchValues.fromStart)
            setTime({
                time_started: renderTime,
                time_ended: duration ? renderTime + duration * 60 : undefined,
            })
        else
            setTime({
                time_started: duration
                    ? renderTime - duration * 60
                    : renderTime,
                time_ended: renderTime,
            })
    }, [from])

    useEffect(() => {
        if (from === TimeSwitchValues.fromStart)
            setTime({
                ...time,
                time_ended: duration ? renderTime + duration * 60 : undefined,
            })
        else
            setTime({
                ...time,
                time_started: duration
                    ? renderTime - duration * 60
                    : renderTime,
            })
    }, [duration])

    useEffect(() => {
        onChange(time.time_started, time.time_ended)
    }, [time])

    return (
        <View>
            <TimeSwitch onChange={setFrom} value={from} />
            <TimePicker
                time={time_started}
                onChange={(value: number) =>
                    setTime({
                        ...time,
                        time_started: value,
                    })
                }
            />
            <DurationPicker
                onChange={value => setDuration(value)}
                value={duration}
            />
        </View>
    )
}
