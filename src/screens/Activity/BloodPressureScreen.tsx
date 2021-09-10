import React, { FC, useEffect } from 'react'
import { View } from 'react-native'
import { defaultStyles, Routes } from '../../constants'
import { strings } from '../../localization'
import { Button } from '../../components/Button'
import { TimePickCombined } from '../../components/TimePickCombined'
import { BloodPressure } from '../../components/BloodPressure'
import { RootStackParamList } from '../../navigation/NavContainer'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { useActivities } from '../../context/activitiesContext'
import { useMakeActivity } from '../../hooks/useMakeActivity'
import { DeleteActivityButton } from '../../components/DeleteActivityButton'

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
    const { activities, activityAdd, activityUpdate, activityDelete } =
        useActivities()
    const { params } = route
    const [activity, updateActivity, updateData] = useMakeActivity({
        activity_type: params.sender,
    })

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
    }, [params])

    return (
        <View style={defaultStyles.container}>
            <TimePickCombined
                time_started={activity.time_started}
                time_ended={activity.time_ended}
                onChange={(time_started, time_ended) => {
                    updateActivity({
                        time_started,
                        time_ended,
                    })
                }}
            />

            <BloodPressure
                values={activity.data.bloodPressure}
                onChange={bp => updateData({ bloodPressure: bp })}
            />
            <Button title={strings.Save} onPress={submit} />
        </View>
    )
}
