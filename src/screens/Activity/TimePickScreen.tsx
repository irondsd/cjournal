import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { ActivityTypes, defaultStyles, Routes } from '../../constants'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { strings } from '../../localization'
import timestamp from '../../helpers/timestamp'
import { useDispatch, useSelector } from 'react-redux'
import { Comment } from '../../components/CommentTS'
import Activity from '../../classes/Activity'
import { IAData } from '../../classes/Activity'
import { Button } from '../../components/Button'
import { AudioRecorder } from '../../components/AudioRecorderTS'
import { TimePickCombined } from '../../components/TimePickCombined'
import { addHint } from '../../services/hints'
import { addActivity } from '../../redux/actions'
import { findLatestTask } from '../../classes/Task'
import { RootState } from '../../redux/store'

type activityType = {
    activity_type?: ActivityTypes
    time_started?: number
    time_ended?: number
    task?: string
    comment?: string
}

export const TimePickScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    const tasks = useSelector((state: RootState) => state.tasks)
    const dispatch = useDispatch()
    const { params } = navigation.state
    const [activity, setActivity] = useState<activityType>({})
    const [data, setData] = useState<IAData>({})

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
        // setup activity
        const time_started = timestamp()
        const activity_type: string = params?.sender
        const task = params?.task || findLatestTask(tasks, activity_type)

        setActivity({
            activity_type: ActivityTypes[activity_type],
            time_started,
            task,
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

TimePickScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}
