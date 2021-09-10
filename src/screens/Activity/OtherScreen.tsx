import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { ActivityTypes, defaultStyles, Routes } from '../../constants'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { strings } from '../../localization'
import timestamp from '../../helpers/timestamp'
import { useDispatch } from 'react-redux'
import { OthersPickers } from '../../components/OthersPickers'
import Activity, { IActivity } from '../../classes/Activity'
import { IAData } from '../../classes/Activity'
import { Button } from '../../components/Button'
import { AudioRecorder } from '../../components/AudioRecorderTS'
import { TimePickCombined } from '../../components/TimePickCombined'
import { addHint } from '../../services/hints'
import { addActivity } from '../../redux/actions'

// todo: refactor to join Others, Trainer and Vertical pos calib screen

export const OtherScreen: NavigationStackScreenComponent = ({ navigation }) => {
    const dispatch = useDispatch()
    const params = navigation?.state?.params
    const [activity, setActivity] = useState<Partial<IActivity>>({})
    const [data, setData] = useState<IAData>({})

    const submit = () => {
        const newAct = Activity.init(
            activity.activity_type,
            activity.time_started,
            activity.time_ended,
            undefined,
            undefined,
            data,
        )
        // console.log(newAct)
        if (data.type) addHint(activity.activity_type, data.type)
        dispatch(addActivity(newAct))
        navigation.navigate(Routes.Home)
    }

    useEffect(() => {
        // setup activity
        const time_started = timestamp()
        const activity_type: string = params?.sender

        setActivity({
            activity_type: ActivityTypes[activity_type],
            time_started,
        })
    }, [params])

    useEffect(() => {
        const sender = params?.sender
        const title: string = strings[sender]
        navigation.setParams({
            headerTitle: title,
        })
    }, [])

    return (
        <View style={defaultStyles.container}>
            <TimePickCombined
                time_started={activity.time_started}
                time_ended={activity.time_ended}
                onChange={(s, e) => {
                    setActivity({ ...activity, time_started: s, time_ended: e })
                }}
            />
            <OthersPickers
                activity_type={activity.activity_type}
                open={true}
                value={data.type}
                onChange={value => setData({ ...data, type: value })}
            />
            <AudioRecorder
                file={data.audioFile}
                onChange={value => setData({ ...data, audioFile: value })}
            />
            <Button title={strings.Save} onPress={submit} />
        </View>
    )
}

OtherScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}
