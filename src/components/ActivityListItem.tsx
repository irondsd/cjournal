import React, { FC } from 'react'
import { displayDateTime } from '../helpers/dateTime'
import { paths, editable } from '../constants'
import ListItem from './ListItem'
import { IActivityClass } from '../classes/Activity'
import { NavigationParams } from 'react-navigation'

interface ActivityListItemProps {
    activity: IActivityClass
    navigation: NavigationParams
}

export const ActivityListItem: FC<ActivityListItemProps> = ({
    activity,
    navigation,
}) => {
    const calculateTime = () => {
        let time
        time = displayDateTime(new Date(activity.time_started * 1000))
        if (
            activity.time_ended != null &&
            activity.time_ended != activity.time_started
        ) {
            time +=
                ' — ' + displayDateTime(new Date(activity.time_ended * 1000))
        }

        return time
    }

    const getInfo = () => {
        let data = null

        if (activity.data) {
            if (activity.data.pill) data = activity.data.pill
            else if (activity.data.type) {
                data = activity.data.type
            }
        }

        return data
    }

    const isSynced = (): boolean => {
        return activity.synced()
    }

    const hasComment = () => {
        return !!activity.comment
    }

    const hasAudio = () => {
        return !!activity.data.audio || !!activity.data.audioFile
    }

    const hasPhoto = () => {
        return !!activity.data.image || !!activity.data.photoFile
    }

    const onPress = () => {
        if (editable.includes(activity.activity_type)) {
            navigation.navigate(paths.ActivityDetails, activity)
        } else {
            navigation.navigate(paths.ActivityStats, activity)
        }
    }

    return (
        <ListItem
            activity_type={activity.activity_type}
            time={calculateTime()}
            data={getInfo()}
            synced={isSynced()}
            comment={hasComment()}
            audio={hasAudio()}
            photo={hasPhoto()}
            onPress={onPress}
        />
    )
}
