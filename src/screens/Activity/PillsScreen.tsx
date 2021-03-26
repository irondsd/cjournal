import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { paths, defaultStyles, prescriptions } from '../../constants'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { strings } from '../../localization'
import timestamp from '../../helpers/timestamp'
import { useSelector, useDispatch } from 'react-redux'
import { addActivity } from '../../redux/actions'
import { findLatestTask } from '../../classes/Task'
import { TimePicker } from '../../components/TimePicker2'
import TakePhoto from '../../components/TakePhoto'
import { DropDownInput } from '../../components/DropDownInput2'
import Activity from '../../classes/Activity'
import { RootState } from '../../redux/store'
import { IAData } from '../../classes/Activity'
import { Button } from '../../components/Button'

type PillsActivityType = {
    activity_type?: string
    time_started?: number
    task?: string
}

export const PillsScreen: NavigationStackScreenComponent = ({ navigation }) => {
    const user = useSelector((state: RootState) => state.user)
    const tasks = useSelector((state: RootState) => state.tasks)
    const dispatch = useDispatch()
    const params = navigation?.state?.params
    const [activity, setActivity] = useState<PillsActivityType>({})
    const [data, setData] = useState<IAData>({})
    const [pillsList, setPillsList] = useState<string[]>([])

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
            data,
        )
        dispatch(addActivity(newAct))
        navigation.navigate(paths.Home)
    }

    useEffect(() => {
        // setup activity
        const time_started = timestamp()
        const activity_type: string = params?.sender
        const task = params?.task || findLatestTask(tasks, activity_type)

        setActivity({
            activity_type,
            time_started,
            task,
        })

        // set pills list
        const pillsType = prescriptions[activity_type]
        const patient = user.patient || {}
        const pillsList: string[] =
            patient[pillsType as keyof typeof patient] || []
        setPillsList(pillsList)

        // set up photo
        const photoFile = params?.image?.uri

        setData({ photoFile: photoFile })
    }, [params])

    useEffect(() => {
        const sender = params?.sender
        const title = strings[sender as keyof typeof strings] as string
        navigation.setParams({
            headerTitle: title,
        })
    }, [])

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
                    navigation.navigate(paths.Camera, {
                        returnTo: paths.Pills,
                    })
                }
                removePhoto={clearPhoto}
            />
            <Button title={strings.Save} onPress={submit} />
        </View>
    )
}

PillsScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}

export default PillsScreen
