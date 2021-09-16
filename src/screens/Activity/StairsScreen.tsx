import React, { FC, useState, useEffect, useLayoutEffect } from 'react'
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

type StairsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Stairs'
>

type StairsScreenProps = {
    navigation: StairsScreenNavigationProp
}

export const StairsScreen: FC<StairsScreenProps> = ({ navigation }) => {
    // const tasks = useSelector((state: RootState) => state.tasks)
    const [activity, updateActivity, updateData] = useMakeActivity({
        activity_type: ActivityTypes.Stairs,
    })
    const [seconds, setSeconds] = useState(0)

    const [progress, setProgress] = useState(false)
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

        // const newAct = Activity.init(
        //     activity.activity_type,
        //     activity.time_started,
        //     activity.time_ended,
        //     activity.task,
        //     undefined,
        //     {
        //         steps: pedometerData.numberOfSteps,
        //         distance: parseInt(pedometerData.distance.toFixed(0)),
        //         locations: geolocationData,
        //     },
        // )
        // console.log(newAct)
        // dispatch(addActivity(newAct))
        navigation.navigate(Routes.Home)
    }

    useEffect(() => {
        // const task = params?.task || findLatestTask(tasks, TYPE)

        // prevent going back without saving
        BackHandler.addEventListener('hardwareBackPress', backPressed)

        return () =>
            BackHandler.removeEventListener('hardwareBackPress', backPressed)
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: strings.Stairs,
        })
    }, [navigation])

    useEffect(() => {
        let timeoutId
        let intervalId
        let time_started

        if (progress) {
            time_started = timestamp()
            updateActivity({ ...activity, time_started })

            intervalId = BackgroundTimer.setInterval(() => {
                // setSeconds(time_started - timestamp() + walkingDuration)
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

    return (
        <View style={defaultStyles.container}>
            <InfoBox
                info={{
                    [strings.Steps]: pedometerData.numberOfSteps,
                    [strings.Time]: secs2time(seconds),
                    [strings.Distance]: `${pedometerData.distance.toFixed(0)} ${
                        strings.m
                    }`,
                }}
            />

            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.descText}>{strings.YouClimbed}</Text>
                <Text style={styles.timer}>
                    {activity.time_started ? `0.0` : 'fdsfsd'}
                </Text>
                <Text style={styles.descText}>{strings.meters}</Text>
            </View>

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
    descText: {
        fontSize: width / 10,
        color: '#00000011',
        textAlign: 'center',
        fontWeight: '100',
    },
    timer: {
        fontSize: width / 7,
        textAlign: 'center',
        fontWeight: '200',
        color: '#00000055',
        fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
    },
})
