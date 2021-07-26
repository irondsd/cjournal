import React, { FC, useState, useEffect } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    BackHandler,
    StatusBar,
    Alert,
} from 'react-native'
import { secs2time } from '../../helpers/dateTime'
import { useDispatch } from 'react-redux'
import { addActivity } from '../../redux/actions'
import { strings } from '../../localization'
import { Routes, ActivityTypes } from '../../constants'
import Activity from '../../classes/Activity'
import timestamp from '../../helpers/timestamp'
import { screenAsyncSave, removeScreen } from '../../services/asyncStorage'
import { Logger } from '../../services/logger'
import { terminateAlarm } from '../../helpers/terminateAlarm'
import { RootStackParamList } from '../../navigation/NavContainer'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { useActivities } from '../../context/activitiesContext'
import { useSettings } from '../../context/settingsContext'
import { useMakeActivity } from '../../hooks/useMakeActivity'

type SleepScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Sleep'
>
type SleepScreenRouteProp = RouteProp<RootStackParamList, 'Sleep'>

type SleepScreenProps = {
    navigation: SleepScreenNavigationProp
    route: SleepScreenRouteProp
}

export const SleepScreen: FC<SleepScreenProps> = ({ navigation, route }) => {
    const [timer, setTimer] = useState<string>('00:00')
    const [startedAt, setStartedAt] = useState(timestamp())
    const logger = new Logger('sleep' + timestamp())
    const { activityAdd } = useActivities()
    const { setLastScreen, resetLastScreen } = useSettings()
    const [activity] = useMakeActivity({ activity_type: ActivityTypes.Sleep })

    const backPressed = () => {
        terminateAlarm(strings.TerminateSleep, submit)
        return true
    }

    const submit = () => {
        resetLastScreen()

        const createdActivity = {
            ...activity,
            time_started: startedAt,
            time_ended: timestamp(),
            updated_at: timestamp(),
        }

        activityAdd(createdActivity)
        navigation.navigate(Routes.SleepFinish, {
            activity: createdActivity._id,
        })
    }

    useEffect(() => {
        // restore screen
        if (route.params?.startedAt) setStartedAt(route.params?.startedAt)

        setLastScreen(Routes.Sleep, {
            startedAt: route.params?.startedAt || startedAt,
        })

        navigation.setOptions({
            headerShown: false,
        })

        // prevent going back without saving
        BackHandler.addEventListener('hardwareBackPress', backPressed)

        return () =>
            BackHandler.removeEventListener('hardwareBackPress', backPressed)
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            const seconds = timestamp() - startedAt
            const timerValue = secs2time(seconds)
            logger.log(
                'debug',
                `seconds elapsed: ${seconds}, timer value: ${timerValue}`,
            )

            setTimer(timerValue)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [startedAt])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'black'} barStyle="light-content" />
            <Text style={styles.text}>{strings.HaveAGoodSleep}</Text>
            <Text style={styles.timer}>{timer}</Text>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        submit()
                    }}>
                    <Text style={styles.buttonText}>{strings.Terminate}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'space-between',
        backgroundColor: 'black',
    },
    text: {
        padding: 10,
        flex: 3,
        color: 'grey',
    },
    timer: {
        fontSize: 80,
        fontWeight: '200',
        flex: 5,
        color: 'rgba(255, 255, 255, 0.3)',
        fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
    },
    button: {
        width: '90%',
        color: 'grey',
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 30,
    },
})
