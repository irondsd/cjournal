import React, { FC } from 'react'
import { displayDateTime } from '../helpers/dateTime'
import { activityPaths } from '../constants'
import { ListItem } from './ListItem'
import { NavigationParams } from 'react-navigation'
import { ITaskClass } from '../classes/Task'

interface TasksListItemProps {
    activity: ITaskClass
    navigation: NavigationParams
}

export const TasksListItem: FC<TasksListItemProps> = ({
    activity,
    navigation,
}) => {
    const getTime = () => {
        return displayDateTime(new Date(activity.time * 1000))
    }

    const getInfo = () => {
        let data

        if (activity.data) {
            if (activity.data.pill) {
                data = activity.data.pill
            }
        }

        return data
    }

    const onPress = () => {
        if (activity.completed) return

        let navigateTo = activityPaths[activity.activity_type]

        navigation.navigate(navigateTo, {
            task: activity._id,
            sender: activity.activity_type,
        })
    }

    return (
        <ListItem
            activity_type={activity.activity_type}
            time={getTime()}
            info={getInfo()}
            onPress={onPress}
        />
    )
}
