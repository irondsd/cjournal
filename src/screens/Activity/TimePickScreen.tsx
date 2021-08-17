import React, { FC, useState, useEffect } from 'react'
import { View } from 'react-native'
import { ActivityTypes, defaultStyles, Routes } from '../../constants'
import { strings } from '../../localization'
import timestamp from '../../helpers/timestamp'
import { useDispatch, useSelector } from 'react-redux'
import { Comment } from '../../components/CommentTS'
import Activity, { IActivity } from '../../classes/Activity'
import { IAData } from '../../classes/Activity'
import { Button } from '../../components/Button'
import { AudioRecorder } from '../../components/AudioRecorderTS'
import { TimePickCombined } from '../../components/TimePickCombined'
import { addHint } from '../../services/hints'
import { addActivity } from '../../redux/actions'
import { findLatestTask } from '../../classes/Task'
import { RootState } from '../../redux/store'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/NavContainer'
import { StackNavigationProp } from '@react-navigation/stack'
import { useActivities } from '../../context/activitiesContext'

type TimePickScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'TimePick'
>
type TimePickScreenRouteProp = RouteProp<RootStackParamList, 'TimePick'>

type TimePickScreenProps = {
    navigation: TimePickScreenNavigationProp
    route: TimePickScreenRouteProp
}

export const TimePickScreen: FC<TimePickScreenProps> = ({
    navigation,
    route,
}) => {
    const tasks = useSelector((state: RootState) => state.tasks)
    const dispatch = useDispatch()
    const { params } = route
    const [activity, setActivity] = useState<Partial<IActivity>>({
        activity_type: ActivityTypes[params.sender],
        task: params.task,
    })
    const [data, setData] = useState<IAData>({})
    const { activities } = useActivities()

    const submit = () => {
        const newAct = Activity.init(
            activity.activity_type,
            activity.time_started,
            activity.time_ended,
            activity.task,
            activity.comment,
            data,
        )
        // console.log(newAct)
        if (data.type) addHint(activity.activity_type, data.type)
        dispatch(addActivity(newAct))
        navigation.navigate(Routes.Home)
    }

    useEffect(() => {
        if (params.id) {
            const act = activities[params.id]
            setActivity(act)
            if (act.data) setData(act.data)
        }

        const sender = params?.sender
        const title: string = strings[sender]
        navigation.setOptions({
            headerTitle: title,
        })

        const task = findLatestTask(tasks, activity.activity_type)
        if (task) setActivity({ task })
    }, [params])

    return (
        <View style={defaultStyles.container}>
            <TimePickCombined
                time_started={activity.time_started}
                time_ended={activity.time_ended}
                onChange={(s, e) => {
                    setActivity({ ...activity, time_started: s, time_ended: e })
                }}
            />
            <Comment
                value={activity.comment}
                onChange={comment => setActivity({ ...activity, comment })}
            />
            <AudioRecorder
                file={data.audioFile}
                onChange={value => setData({ ...data, audioFile: value })}
            />
            <Button title={strings.Save} onPress={submit} />
        </View>
    )
}
