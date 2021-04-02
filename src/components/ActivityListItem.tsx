import React, { FC, ReactNode } from 'react'
import { displayDateTime } from '../helpers/dateTime'
import { paths, editable } from '../constants'
import { ListItem } from './ListItem'
import { IActivityClass } from '../classes/Activity'
import { NavigationParams } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

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
            navigation.navigate(paths.ActivityDetails, activity)
        } else {
            navigation.navigate(paths.ActivityStats, activity)
        }
    }

    const getIcons = () => {
        const icons: ReactNode[] = []

        const props = {
            color: '#999999',
            size: 12,
            style: { paddingRight: 3 },
        }

        if (activity.hasComment()) {
            const name = 'comment'
            icons.push(<Icon name={name} {...props} key={name} />)
        }
        if (activity.hasPhoto()) {
            const name = 'camera'
            icons.push(<Icon name={name} {...props} key={name} />)
        }
        if (activity.hasAudio()) {
            const name = 'microphone'
            icons.push(<Icon name={name} {...props} key={name} />)
        }
        if (activity.hasLocation()) {
            const name = 'location-on'
            icons.push(
                <MaterialIcons name={name} {...props} size={14} key={name} />,
            )
        }
        return icons
    }

    return (
        <ListItem
            activity_type={activity.activity_type}
            time={calculateTime()}
            info={getInfo()}
            synced={activity.synced()}
            icons={getIcons()}
            onPress={onPress}
        />
    )
}
