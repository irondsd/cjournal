import React, { FC, useState, useEffect } from 'react'
import {
    View,
    Text,
    Platform,
    StyleSheet,
    Vibration,
    BackHandler,
} from 'react-native'
import {
    ActivityTypes,
    defaultStyles,
    Routes,
    walkingDuration,
} from '../../constants'
import { strings } from '../../localization'
import timestamp from '../../helpers/timestamp'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../../components/Button'
// import { RootState } from '../../redux/store'
import { InfoBox } from '../../components/exercise/InfoBox'
import { CircleProgress } from '../../components/exercise/CircleProgress'
import { width } from '../../constants'
import BackgroundTimer from 'react-native-background-timer'
import { secs2time } from '../../helpers/dateTime'
import { useGeolocation } from '../../hooks/useGeolocation'
import { usePedometer } from '../../hooks/usePedometer'
import { terminateAlarm } from '../../helpers/terminateAlarm'
import { BackButton } from '../../components/BackButton'
import { useMakeActivity } from '../../hooks/useMakeActivity'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigation/NavContainer'
import { useActivities } from '../../context/activitiesContext'

type WalkingTestScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'WalkingTest'
>

type WalkingTestScreenProps = {
    navigation: WalkingTestScreenNavigationProp
}

export const WalkingTestScreen: FC<WalkingTestScreenProps> = ({
    navigation,
}) => {
    const { activityAdd } = useActivities()
    const [activity, updateActivity] = useMakeActivity({
        activity_type: ActivityTypes.WalkingTest,
    })

    const [progress, setProgress] = useState(false)
    const [seconds, setSeconds] = useState(walkingDuration)
    const {
        geolocationData,
        startUpdates: startGPS,
        stopUpdates: stopGPS,
    } = useGeolocation()

    const {
        pedometerData,
        startUpdates: startPedometer,
        stopUpdates: stopPedometer,
    } = usePedometer()

    const buttonPress = () => {
        if (!progress) setProgress(true)
        else backPressed()
    }

    const backPressed = () => {
        if (progress) {
            terminateAlarm(strings.CantGoBack, submit)
            return true
        }
    }

    const submit = () => {
        setProgress(false)
        Vibration.vibrate(600)

        const createdActivity = { ...activity }

        if (!createdActivity.data) createdActivity.data = {}
        createdActivity.data.distance = pedometerData.distance
        createdActivity.data.steps = pedometerData.numberOfSteps
        createdActivity.data.locations = [...geolocationData]

        console.log(createdActivity)
        // activityAdd(createdActivity)
        // navigation.navigate(Routes.Home)
    }

    useEffect(() => {
        // const task = params?.task || findLatestTask(tasks, TYPE)

        navigation.setOptions({
            headerTitle: strings[ActivityTypes.WalkingTest],
        })

        // prevent going back without saving
        BackHandler.addEventListener('hardwareBackPress', backPressed)

        return () =>
            BackHandler.removeEventListener('hardwareBackPress', backPressed)
    }, [])

    useEffect(() => {
        let timeoutId
        let intervalId
        let time_started

        if (progress) {
            time_started = timestamp()
            updateActivity({ time_started })

            intervalId = BackgroundTimer.setInterval(() => {
                setSeconds(time_started - timestamp() + walkingDuration)
            }, 200)

            // timeout for 6 minutes
            timeoutId = BackgroundTimer.setTimeout(() => {
                submit()
            }, walkingDuration * 1000)

            startGPS()
            startPedometer()
        } else {
            BackgroundTimer.clearInterval(intervalId)
            BackgroundTimer.clearTimeout(timeoutId)
            stopGPS()
            stopPedometer()
        }

        return () => {
            BackgroundTimer.clearInterval(intervalId)
            BackgroundTimer.clearTimeout(timeoutId)
            stopGPS()
            stopPedometer()
        }
    }, [progress])

    useEffect(() => {
        if (seconds === 0) {
            submit()
        }
    }, [seconds])

    return (
        <View style={defaultStyles.container}>
            <InfoBox
                info={{
                    [strings.Steps]: pedometerData.numberOfSteps,
                    [strings.Distance]: `${pedometerData.distance.toFixed(0)} ${
                        strings.m
                    }`,
                }}
            />
            <CircleProgress progress={seconds / 3.6}>
                <Text style={styles.timer}>
                    {activity.time_started
                        ? secs2time(seconds)
                        : secs2time(walkingDuration)}
                </Text>
            </CircleProgress>
            <Button
                title={progress ? strings.Terminate : strings.Start}
                onPress={() => {
                    buttonPress()
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    timer: {
        fontSize: width / 7,
        fontWeight: '200',
        color: '#00000055',
        transform: [{ scaleX: -1 }],
        fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
    },
})
