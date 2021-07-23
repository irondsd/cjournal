import React, { FC, useState, useEffect } from 'react'
import { View } from 'react-native'
import { ActivityTypes, defaultStyles, Routes } from '../../constants'
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
import { RootStackParamList } from '../../navigation/NavContainer'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

type OtherScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Other'
>
type OtherScreenRouteProp = RouteProp<RootStackParamList, 'Other'>

type OtherScreenProps = {
    navigation: OtherScreenNavigationProp
    route: OtherScreenRouteProp
}

// todo: refactor to join Others, Trainer and Vertical pos calib screen

export const OtherScreen: FC<OtherScreenProps> = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { params } = route
    const [activity, setActivity] = useState<Partial<IActivity>>({
        activity_type: ActivityTypes[params.sender],
        time_started: timestamp(),
    })
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
        const { sender } = params
        const title = strings[sender]
        navigation.setOptions({
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
