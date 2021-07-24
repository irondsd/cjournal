import React, { FC, ReactNode } from 'react'
import { displayDateTime } from '../helpers/dateTime'
import { Routes, editable } from '../constants'
import { ListItem } from './ListItem'
import { IActivity, IActivityClass } from '../classes/Activity'
import { Icon, IconProps } from '../components/Icon'

type ActivityListItemProps = {
    activity: IActivityClass
    navigation: any
}

// todo

const synced = (activity: IActivity) => {
    if (activity.system) {
        if (activity.system.awaitsSync) return false
        if (activity.system.awaitsEdit) return false
        if (activity.system.awaitsDelete) return false
    }

    return true
}

const hasLocation = (activity: IActivity) => {
    return !!activity.data?.locations
}

const hasPhoto = (activity: IActivity) => {
    return !!activity.data?.photoFile || !!activity.data?.image
}

const hasAudio = (activity: IActivity) => {
    return !!activity.data?.audioFile || !!activity.data?.audio
}

const hasComment = (activity: IActivity) => {
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
        // todo: routing
        if (editable.includes(activity.activity_type)) {
            navigation.navigate(Routes.ActivityDetails, activity)
        } else {
            navigation.navigate(Routes.ActivityStats, activity)
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
