import React, { FC, useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import {
    Routes,
    defaultStyles,
    prescriptions,
    ActivityTypes,
} from '../../constants'
import { strings } from '../../localization'
import timestamp from '../../helpers/timestamp'
import { findLatestTask } from '../../classes/Task'
import { TimePicker } from '../../components/TimePicker'
import { Photo } from '../../components/Photo'
import { DropDownInput } from '../../components/DropDownInput'
import Activity from '../../classes/Activity'
import { IAData } from '../../classes/Activity'
import { Button } from '../../components/Button'
import { objectCleanUp } from '../../helpers/utils'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/NavContainer'
import { StackNavigationProp } from '@react-navigation/stack'
import { useTasks } from '../../context/tasksContext'
import { useUser } from '../../context/userContext'
import { useActivities } from '../../context/activitiesContext'
import { useMakeActivity } from '../../hooks/useMakeActivity'
import { DeleteActivityButton } from '../../components/DeleteActivityButton'

type PillsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Pills'
>
type PillsScreenRouteProp = RouteProp<RootStackParamList, 'Pills'>

type PillsScreenProps = {
    navigation: PillsScreenNavigationProp
    route: PillsScreenRouteProp
}
type PillsActivityType = {
    activity_type?: ActivityTypes
    time_started?: number
    task?: string
}

export const PillsScreen: FC<PillsScreenProps> = ({ navigation, route }) => {
    const { params } = route
    const { activities, activityAdd, activityUpdate, activityDelete } =
        useActivities()
    const [activity, updateActivity, updateData] = useMakeActivity({
        activity_type: params.sender,
    })
    const { tasks } = useTasks()
    const { patient } = useUser()
    const [pillsList, setPillsList] = useState([])

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
                headerRight: () => {
                    return (
                        <DeleteActivityButton
                            onPress={() => {
                                activityDelete(act)
                                navigation.goBack()
                            }}
                        />
                    )
                },
            })
        } else {
            const title = strings[sender]
            navigation.setOptions({
                headerTitle: title,
            })
        }

        // set pills list
        const pillsType = prescriptions[sender]

        const pillsList: string[] =
            patient[pillsType as keyof typeof patient] || []
        setPillsList(pillsList)

        // set up photo
        const uri = params?.image?.uri
        if (uri) updateData({ photoFile: uri })
    }, [params])

    return (
        <View style={defaultStyles.container}>
            <View style={{ width: '100%' }}>
                <TimePicker
                    time={activity.time_started!}
                    onChange={value => updateActivity({ time_started: value })}
                />
            </View>
            <DropDownInput
                placeholder={strings.Drug}
                options={pillsList}
                onChange={value => updateData({ pill: value })}
                open={true}
                value={activity.data.pill!}
            />
            <Photo
                value={activity.data.photoFile}
                onChange={() => {
                    updateData({ photoFile: undefined })
                }}
                openCamera={() =>
                    navigation.navigate(Routes.Camera, {
                        returnTo: Routes.Pills,
                        sender: params.sender,
                    })
                }
            />
            <Button title={strings.Save} onPress={submit} />
        </View>
    )
}
