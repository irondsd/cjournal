import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { defaultStyles, Routes } from '../../constants'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { strings } from '../../localization'
import timestamp from '../../helpers/timestamp'
import { useDispatch } from 'react-redux'
import Activity from '../../classes/Activity'
import { IAData } from '../../classes/Activity'
import { Button } from '../../components/Button'
import { TimePickCombined } from '../../components/TimePickCombined'
import { addActivity } from '../../redux/actions'
import { BloodPressure } from '../../components/BloodPressureTS'

type BloodPressureActivityType = {
    activity_type?: string
    time_started?: number
    time_ended?: number
    data?: IAData
}

export const BloodPressureScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    const dispatch = useDispatch()
    const params = navigation?.state?.params
    const [activity, setActivity] = useState<BloodPressureActivityType>({})
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
        dispatch(addActivity(newAct))
        navigation.navigate(Routes.Home)
    }

    useEffect(() => {
        // setup activity
        const time_started = timestamp()
        const activity_type: string = params?.sender

        setActivity({
            activity_type,
            time_started,
        })
    }, [params])

    useEffect(() => {
        const sender = params?.sender
        const title: string = strings[sender]
        navigation.setParams({
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

BloodPressureScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}
