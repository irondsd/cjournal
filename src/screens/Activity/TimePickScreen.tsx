import React, { FC, useEffect } from 'react'
import { View } from 'react-native'
import { defaultStyles, Routes } from '../../constants'
import { strings } from '../../localization'
import { Comment } from '../../components/CommentTS'
import { Button } from '../../components/Button'
import { AudioRecorder } from '../../components/AudioRecorderTS'
import { TimePickCombined } from '../../components/TimePickCombined'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/NavContainer'
import { StackNavigationProp } from '@react-navigation/stack'
import { useActivities } from '../../context/activitiesContext'
import { useTasks } from '../../context/tasksContext'
import { useMakeActivity } from '../../hooks/useMakeActivity'

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
    const { params } = route
    const { activities, activityAdd, activityUpdate } = useActivities()
    const [activity, updateActivity, updateData] = useMakeActivity({
        activity_type: params.sender,
    })
    const { tasks } = useTasks()

    const submit = () => {
        if (params.id) activityUpdate(activity)
        else activityAdd(activity)

        navigation.navigate(Routes.Home)
    }

    useEffect(() => {
        const { sender, id } = params

        if (id) {
            const act = activities[id]
            updateActivity({ ...act })
            if (act.data) updateData({ ...act.data })
            navigation.setOptions({
                headerTitle: `${strings.Editing} ${strings[sender]}`,
            })
        } else {
            const title = strings[sender]
            navigation.setOptions({
                headerTitle: title,
            })
        }

        // const task = findLatestTask(tasks, activity.activity_type)
        // if (task) setActivity({ task })
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
            <Comment
                value={activity.comment}
                onChange={comment => updateActivity({ comment })}
            />
            <AudioRecorder
                file={activity.data.audioFile}
                onChange={value => updateData({ audioFile: value })}
            />
            <Button title={strings.Save} onPress={submit} />
        </View>
    )
}
