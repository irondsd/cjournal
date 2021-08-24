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
import { RootStackParamList } from '../../navigation/NavContainer'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { useActivities } from '../../context/activitiesContext'
import { useMakeActivity } from '../../hooks/useMakeActivity'

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
    const { activities, activityAdd, activityUpdate } = useActivities()
    const { params } = route
    const [activity, updateActivity, updateData] = useMakeActivity({
        activity_type: params.sender,
    })

    const submit = () => {
        if (params.id) activityUpdate(activity)
        else activityAdd(activity)

        navigation.navigate(Routes.Home)
        if (activity.data.type)
            addHint(activity.activity_type, activity.data.type)
        navigation.navigate(Routes.Home)
    }

    useEffect(() => {
        const { sender, id } = params

        if (id) {
            const act = activities[id]
            updateActivity({ ...act })
            if (act.data) updateData({ ...act.data })
        } else {
            const title = strings[sender]
            navigation.setOptions({
                headerTitle: title,
            })
        }
    }, [params])

    return (
        <View style={defaultStyles.container}>
            <TimePickCombined
                time_started={activity.time_started}
                time_ended={activity.time_ended}
                onChange={(time_started, time_ended) => {
                    updateActivity({ time_started, time_ended })
                }}
            />
            <OthersPickers
                activity_type={activity.activity_type}
                open={true}
                value={activity.data.type}
                onChange={value => updateData({ type: value })}
            />
            <AudioRecorder
                file={activity.data.audioFile}
                onChange={value => updateData({ audioFile: value })}
            />
            <Button title={strings.Save} onPress={submit} />
        </View>
    )
}
