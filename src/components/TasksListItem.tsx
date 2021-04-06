import React, { FC } from 'react'
import { displayDateTime } from '../helpers/dateTime'
import { activityPaths } from '../constants'
import { ListItem } from './ListItem'
import { NavigationParams } from 'react-navigation'
import { ITaskClass } from '../classes/Task'

interface TasksListItemProps {
    task: ITaskClass
    navigation: NavigationParams
}

export const TasksListItem: FC<TasksListItemProps> = ({ task, navigation }) => {
    const getTime = () => {
        return displayDateTime(new Date(task.time * 1000))
    }

    const getInfo = () => {
        let data

        if (task.data) {
            if (task.data.pill) {
                data = task.data.pill
            }
        }

        return data
    }

    const onPress = () => {
        if (task.completed) return

        let navigateTo = activityPaths[task.activity_type]

        navigation.navigate(navigateTo, {
            task: task._id,
            sender: task.activity_type,
        })
    }

    return (
        <ListItem
            activity_type={task.activity_type}
            time={getTime()}
            info={getInfo()}
            onPress={onPress}
        />
    )
}