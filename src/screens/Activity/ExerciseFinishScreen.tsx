import React, { FC, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    BackHandler,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { defaultStyles } from '../../constants'
import { strings } from '../../localization'
import { Routes } from '../../constants'
import { FeelingsIcon } from '../../components/FeelingsIcon'
import { writeLog } from '../../services/logger'
import { terminateAlarm } from '../../helpers/terminateAlarm'
import { IActivityClass, IAData } from '../../classes/Activity'
import { useActivities } from '../../context/activitiesContext'

const imgSize = Dimensions.get('window').width / 2.5

export const ExerciseFinishScreen: FC<{ navigation: any }> = ({
    navigation,
}) => {
    const { activityUpdate } = useActivities()

    const submit = (feeling: IAData['feeling']) => {
        const activity: IActivityClass = navigation.state.params.activity
        activity.data.feeling = strings[feeling]
        activityUpdate(activity)
        navigation.navigate(Routes.Home)
    }

    const backPressed = () => {
        terminateAlarm(strings.SleepFinishTerminateQuestion, () =>
            navigation.navigate(Routes.Home),
        )
        return true
    }

    useEffect(() => {
        if (!navigation.state?.params?.activity) {
            writeLog('error', 'ExerciseFinish no activity')
            navigation.navigate(Routes.Home)
        }

        BackHandler.addEventListener('hardwareBackPress', backPressed)

        return () =>
            BackHandler.removeEventListener('hardwareBackPress', backPressed)
    }, [])

    return (
        <View style={defaultStyles.container}>
            <Text style={styles.text}>{strings.ExerciseFinishText}</Text>
            <Text style={styles.text}>{strings.HowDoYouFeelAfterThis}</Text>
            <View style={styles.feelingsBox}>
                <TouchableOpacity
                    onPress={() => {
                        submit('Bad')
                    }}>
                    <FeelingsIcon feeling="bad" size={imgSize} fill={'grey'} />
                    <Text style={styles.text}>{strings.Bad}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        submit('Normal')
                    }}>
                    <FeelingsIcon
                        feeling="normal"
                        size={imgSize}
                        fill={'grey'}
                    />
                    <Text style={styles.text}>{strings.Normal}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        submit('Good')
                    }}>
                    <FeelingsIcon feeling="good" size={imgSize} fill={'grey'} />
                    <Text style={styles.text}>{strings.Good}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
    },
    feelingsBox: {
        top: 100,
        height: '50%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    img: {
        tintColor: 'grey',
        marginLeft: 10,
        marginRight: 10,
    },
})
