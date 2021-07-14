import React, { useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    BackHandler,
    StatusBar,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { updateActivity } from '../../redux/actions'
import { strings } from '../../localization'
import { Routes, width } from '../../constants'
import { IActivityClass, IAData } from '../../classes/Activity'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { FeelingsIcon } from '../../components/FeelingsIcon'
import { terminateAlarm } from '../../helpers/terminateAlarm'
import { writeLog } from '../../services/logger'

const smileSize = width / 2.5

export const SleepFinishScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    const dispatch = useDispatch()

    const submit = (feeling: IAData['feeling']) => {
        const activity: IActivityClass = navigation.state.params.activity
        activity.data.feeling = strings[feeling]
        dispatch(updateActivity(activity))
        navigation.navigate(Routes.Home)
    }

    const smileProps = {
        size: smileSize,
        fill: '#ffffff88',
    }

    const backPressed = () => {
        terminateAlarm(strings.SleepFinishTerminateQuestion, () =>
            navigation.navigate(Routes.Home),
        )
        return true
    }

    useEffect(() => {
        if (!navigation.state?.params?.activity) {
            writeLog('error', 'SleepFinish no activity')
            navigation.navigate(Routes.Home)
        }

        BackHandler.addEventListener('hardwareBackPress', backPressed)

        return () =>
            BackHandler.removeEventListener('hardwareBackPress', backPressed)
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'black'} barStyle="light-content" />
            <Text style={styles.question}>{strings.SleepFinishQuestion}</Text>
            <View style={styles.feelingsBox}>
                <TouchableOpacity
                    onPress={() => {
                        submit('Bad')
                    }}>
                    <FeelingsIcon feeling="bad" {...smileProps} />
                    <Text style={styles.text}>{strings.Bad}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        submit('Normal')
                    }}>
                    <FeelingsIcon feeling="normal" {...smileProps} />
                    <Text style={styles.text}>{strings.Normal}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        submit('Good')
                    }}>
                    <FeelingsIcon feeling="good" {...smileProps} />
                    <Text style={styles.text}>{strings.Good}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

SleepFinishScreen.navigationOptions = () => {
    return { header: null, headerLeft: null }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-end',
        height: '100%',
        backgroundColor: 'black',
        padding: '10%',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: '#ffffff88',
    },
    question: {
        fontSize: 30,
        textAlign: 'center',
        color: '#ffffff88',
        marginBottom: '20%',
    },
    feelingsBox: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
    },
})
