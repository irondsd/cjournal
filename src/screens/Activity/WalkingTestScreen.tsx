import React, { useState, useEffect } from 'react'
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
    paths,
    walkingDuration,
} from '../../constants'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { strings } from '../../localization'
import timestamp from '../../helpers/timestamp'
import { useDispatch, useSelector } from 'react-redux'
import Activity from '../../classes/Activity'
import { Button } from '../../components/Button'
import { addActivity } from '../../redux/actions'
import { findLatestTask } from '../../classes/Task'
import { RootState } from '../../redux/store'
import { InfoBox } from '../../components/exercise/InfoBox'
import { CircleProgress } from '../../components/exercise/CircleProgress'
import { width } from '../../constants'
import BackgroundTimer from 'react-native-background-timer'
import { secs2time } from '../../helpers/dateTime'
import { useGeolocation } from '../../hooks/useGeolocation'
import { usePedometer } from '../../hooks/usePedometer'
import { terminateAlarm } from '../../helpers/terminateAlarm'
import { BackButton } from '../../components/BackButton'

type ActivityType = {
    activity_type?: string
    time_started?: number
    time_ended?: number
    task?: string
    comment?: string
}

const TYPE = ActivityTypes.WalkingTest

export const WalkingTestScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    const dispatch = useDispatch()
    const tasks = useSelector((state: RootState) => state.tasks)
    const [activity, setActivity] = useState<ActivityType>({
        activity_type: TYPE,
    })
    const { params } = navigation.state
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

        const newAct = Activity.init(
            activity.activity_type,
            activity.time_started,
            activity.time_ended,
            activity.task,
            undefined,
            {
                steps: pedometerData.numberOfSteps,
                distance: parseInt(pedometerData.distance.toFixed(0)),
                locations: geolocationData,
            },
        )
        // console.log(newAct)
        dispatch(addActivity(newAct))
        navigation.navigate(paths.Home)
    }

    useEffect(() => {
        const task = params?.task || findLatestTask(tasks, TYPE)
        setActivity({ ...activity, task })
        navigation.setParams({ headerTitle: strings[TYPE] })

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
            setActivity({ ...activity, time_started })

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
    console.log(activity)
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

WalkingTestScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
        headerLeft: null,
    }
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
