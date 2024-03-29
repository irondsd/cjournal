import React, { FC, ReactNode } from 'react'
import { displayDateTime } from '../helpers/dateTime'
import { Routes, editable } from '../constants'
import { ListItem } from './ListItem'
import { Activity } from '../types/Activity'
import { Icon, IconProps } from '../components/Icon'
import { ActivityRouter } from '../navigation/ActivityRouter'
import { showMessage } from '../services/toast'
import { strings } from '../localization'

type ActivityListItemProps = {
    activity: Activity
    navigation: any
}

const synced = (activity: Activity) => {
    if (activity.system) {
        if (activity.system.awaitsSync) return false
        if (activity.system.awaitsEdit) return false
        if (activity.system.awaitsDelete) return false
    }

    return true
}

const hasLocation = (activity: Activity) => {
    return !!activity.data?.locations
}

const hasPhoto = (activity: Activity) => {
    return !!activity.data?.photoFile || !!activity.data?.image
}

const hasAudio = (activity: Activity) => {
    return !!activity.data?.audioFile || !!activity.data?.audio
}

const hasComment = (activity: Activity) => {
    return !!activity.comment
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
        let data

        if (activity.data) {
            if (activity.data.pill) data = activity.data.pill
            else if (activity.data.type) {
                data = activity.data.type
            }
        }

        return data
    }

    const onPress = () => {
        if (editable.includes(activity.activity_type)) {
            const { _id, activity_type } = activity
            const route = ActivityRouter(activity_type)

            // hack
            if (route === Routes.Sleep) 
                return navigation.navigate(Routes.TimePick, { sender: activity_type, id: _id })

            navigation.navigate(route, { sender: activity_type, id: _id })
        } else {
            // not editable
            showMessage(
                `${strings.CantEdit} ${strings[activity.activity_type]}`,
            )
        }
    }

    const getIcons = () => {
        const icons: ReactNode[] = []

        const props: Partial<IconProps> = {
            color: '#999999',
            size: 12,
            style: { paddingRight: 3 },
            set: 'FontAwesome',
        }

        if (hasComment(activity)) {
            const name = 'comment'
            icons.push(<Icon name={name} {...props} key={name} />)
        }
        if (hasPhoto(activity)) {
            const name = 'camera'
            icons.push(<Icon name={name} {...props} key={name} />)
        }
        if (hasAudio(activity)) {
            const name = 'microphone'
            icons.push(<Icon name={name} {...props} key={name} />)
        }
        if (hasLocation(activity)) {
            const name = 'location-on'
            icons.push(
                <Icon
                    name={name}
                    {...props}
                    size={14}
                    key={name}
                    set="MaterialIcons"
                />,
            )
        }
        return icons
    }

    return (
        <ListItem
            activity_type={activity.activity_type}
            time={calculateTime()}
            info={getInfo()}
            synced={synced(activity)}
            icons={getIcons()}
            onPress={onPress}
        />
    )
}
