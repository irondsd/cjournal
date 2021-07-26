import React, { FC, useEffect } from 'react'
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
import { Routes, smileSize } from '../../constants'
import { IActivityClass, IAData } from '../../classes/Activity'
import { FeelingsIcon } from '../../components/FeelingsIcon'
import { terminateAlarm } from '../../helpers/terminateAlarm'
import { writeLog } from '../../services/logger'
import { RootStackParamList } from '../../navigation/NavContainer'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { useActivities } from '../../context/activitiesContext'

type SleepFinishScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'SleepFinish'
>
type SleepFinishScreenRouteProp = RouteProp<RootStackParamList, 'SleepFinish'>

type SleepFinishScreenProps = {
    navigation: SleepFinishScreenNavigationProp
    route: SleepFinishScreenRouteProp
}

export const SleepFinishScreen: FC<SleepFinishScreenProps> = ({
    navigation,
    route,
}) => {
    const { activities, activityUpdate } = useActivities()

    const submit = (feeling: IAData['feeling']) => {
        const activity_id = route.params.activity
        const activity = activities[activity_id]
        console.log(activity)
        // activity.data.feeling = strings[feeling]
        // activityUpdate(activity)
        // navigation.navigate(Routes.Home)
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
        navigation.setOptions({
            headerShown: false,
        })

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
