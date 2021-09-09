import React, { FC, useState, useEffect } from 'react'
import { View } from 'react-native'
import { defaultStyles, Routes, ActivityTypes } from '../../constants'
import { strings } from '../../localization'
import timestamp from '../../helpers/timestamp'
import { useDispatch } from 'react-redux'
import Activity, { IActivity } from '../../classes/Activity'
import { IAData } from '../../classes/Activity'
import { Button } from '../../components/Button'
import { TimePickCombined } from '../../components/TimePickCombined'
import { BloodPressure } from '../../components/BloodPressure'
import { RootStackParamList } from '../../navigation/NavContainer'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { useActivities } from '../../context/activitiesContext'

type BloodPressureScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'BloodPressure'
>
type BloodPressureScreenRouteProp = RouteProp<
    RootStackParamList,
    'BloodPressure'
>

type BloodPressureScreenProps = {
    navigation: BloodPressureScreenNavigationProp
    route: BloodPressureScreenRouteProp
}

export const BloodPressureScreen: FC<BloodPressureScreenProps> = ({
    navigation,
    route,
}) => {
    const { activityAdd } = useActivities()
    const { params } = route
    const [activity, setActivity] = useState<Partial<IActivity>>({
        activity_type: ActivityTypes[params.sender],
        time_started: timestamp(),
    })
    const [data, setData] = useState<IAData>({})

    const submit = () => {
        const newAct = Activity.init(
            activity.activity_type,
            activity.time_started,
            activity.time_ended,
            undefined,
            undefined,
            data,
        )
        activityAdd(newAct)
        navigation.navigate(Routes.Home)
    }

    useEffect(() => {
        const { sender } = params
        const title = strings[sender]
        navigation.setOptions({
            headerTitle: title,
        })
    }, [])

    return (
        <View style={defaultStyles.container}>
            <TimePickCombined
                time_started={activity.time_started}
                time_ended={activity.time_ended}
                onChange={(s, e) => {
                    setActivity({ ...activity, time_started: s, time_ended: e })
                }}
            />

            <BloodPressure
                values={data.bloodPressure}
                onChange={bp =>
                    setData(prev => {
                        return { ...prev, bloodPressure: bp }
                    })
                }
            />
            <Button title={strings.Save} onPress={submit} />
        </View>
    )
}
