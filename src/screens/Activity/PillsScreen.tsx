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
import { TimePicker } from '../../components/TimePicker2'
import TakePhoto from '../../components/TakePhoto'
import { DropDownInput } from '../../components/DropDownInputTS'
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
    const [activity, setActivity] = useState<PillsActivityType>({})
    const [data, setData] = useState<IAData>({})
    const [pillsList, setPillsList] = useState<string[]>([])
    const { patient } = useUser()
    const { activityAdd } = useActivities()

    const updateActivityValue = (key: string, value: any) => {
        setActivity({
            ...activity,
            [key]: value,
        })
    }
    const updateDataValue = (key: string, value: any) => {
        setData({
            ...data,
            [key]: value,
        })
    }

    const clearPhoto = () => {
        updateDataValue('photoFile', undefined)
    }

    const submit = () => {
        const newAct = Activity.init(
            activity.activity_type!,
            activity.time_started!,
            undefined,
            activity.task,
            undefined,
            objectCleanUp(data),
        )
        activityAdd(newAct)
        navigation.navigate(Routes.Home)
    }

    useEffect(() => {
        const sender = params.sender
        const title: string = strings[sender]
        navigation.setOptions({
            headerTitle: title,
        })

        // setup activity
        const time_started = timestamp()
        const activity_type: ActivityTypes = params.sender
        // const task = params?.task || findLatestTask(tasks, activity_type)
        setActivity({
            activity_type: ActivityTypes[activity_type],
            time_started,
            // task,
        })
        // set pills list
        const pillsType = prescriptions[activity_type]
        const pillsList: string[] =
            patient[pillsType as keyof typeof patient] || []
        setPillsList(pillsList)
        // set up photo
        const photoFile = params?.image?.uri
        if (photoFile) setData({ photoFile: photoFile })
    }, [params])

    return (
        <View style={defaultStyles.container}>
            <TimePicker
                time={activity.time_started!}
                onChange={(value: any) =>
                    updateActivityValue('time_started', value)
                }
            />
            <DropDownInput
                placeholder={strings.Drug}
                options={pillsList}
                onChange={(value: any) => updateDataValue('pill', value)}
                open={true}
                value={data.pill!}
            />
            <TakePhoto
                photo={data.photoFile}
                openCamera={() =>
                    navigation.navigate(Routes.Camera, {
                        returnTo: Routes.Pills,
                    })
                }
                removePhoto={clearPhoto}
            />
            <Button title={strings.Save} onPress={submit} />
        </View>
    )
}
