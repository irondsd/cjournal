import React, { useState, useEffect } from 'react'
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
import { paths, activityTypes } from '../../constants'
import Activity from '../../classes/Activity'
import timestamp from '../../helpers/timestamp'
import { screenAsyncSave, removeScreen } from '../../services/asyncStorage'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { Logger } from '../../services/logger'

export const SleepScreen: NavigationStackScreenComponent = ({ navigation }) => {
    const [timer, setTimer] = useState<string>('00:00')
    const [startedAt, setStartedAt] = useState(timestamp())
    const logger = new Logger('sleep' + timestamp())

    const dispatch = useDispatch()

    const backPressed = () => {
        logger.log('debug', `back button press attempt at ${timestamp()}`)
        Alert.alert(
            `${strings.Terminate}?`,
            strings.TerminateSleep,
            [
                {
                    text: strings.Cancel,
                    style: 'cancel',
                },
                {
                    text: strings.Terminate,
                    onPress: () => submit(),
                },
            ],
            { cancelable: false },
        )
        return true
    }

    const submit = () => {
        removeScreen()
        const createdActivity = Activity.init(
            activityTypes.Sleep,
            startedAt,
            timestamp(),
            undefined,
            undefined,
            { logFile: logger.filename },
        )
        logger.log('debug', `activity: ${JSON.stringify(createdActivity)}`)
        dispatch(addActivity(createdActivity))
        logger.log('debug', 'recorded, navigating to finish')
        navigation.navigate(paths.SleepFinish, {
            activity: createdActivity,
        })
    }

    useEffect(() => {
        // restore screen
        if (navigation.state?.params?.startedAt) {
            logger.log(
                'debug',
                `screen restored with value ${navigation.state.params.startedAt}`,
            )
            setStartedAt(navigation.state.params.startedAt)
        }

        // save screen
        screenAsyncSave({
            screen: 'Sleep',
            startedAt: navigation.state?.params?.startedAt
                ? navigation.state?.params?.startedAt
                : startedAt,
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

SleepScreen.navigationOptions = () => {
    return { header: null, headerLeft: null }
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
