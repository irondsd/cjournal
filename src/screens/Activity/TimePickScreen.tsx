import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { defaultStyles, paths } from '../../constants'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { strings } from '../../localization'
import timestamp from '../../helpers/timestamp'
import { useDispatch } from 'react-redux'
import { Comment } from '../../components/CommentTS'
import Activity from '../../classes/Activity'
import { IAData } from '../../classes/Activity'
import { Button } from '../../components/Button'
import { AudioRecorder } from '../../components/AudioRecorderTS'
import { TimePickCombined } from '../../components/TimePickCombined'
import { addHint } from '../../services/hints'
import { addActivity } from '../../redux/actions'

type activityType = {
    activity_type?: string
    time_started?: number
    time_ended?: number
    comment?: string
}

export const TimePickScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    const dispatch = useDispatch()
    const params = navigation?.state?.params
    const [activity, setActivity] = useState<activityType>({})
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
        navigation.navigate(paths.Home)
    }

    useEffect(() => {
        // setup activity
        const time_started = timestamp()
        const activity_type: string = params?.sender

        setActivity({
            activity_type,
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
