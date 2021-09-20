import React, { FC } from 'react'
import { displayDateTime } from '../helpers/dateTime'
import { ListItem } from './ListItem'
import { Task } from '../types/Task'
import { ActivityRouter } from '../navigation/ActivityRouter'

interface TasksListItemProps {
    task: Task
    navigation: any
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
        const route = ActivityRouter(task.activity_type)

        navigation.navigate(route, {
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
