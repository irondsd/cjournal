import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { defaultStyles, Routes, ActivityTypes } from '../../constants'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import { strings } from '../../localization'
import timestamp from '../../helpers/timestamp'
import { useDispatch } from 'react-redux'
import { OthersPickers } from '../../components/OthersPickers'
import Activity, { IActivity } from '../../classes/Activity'
import { IAData } from '../../classes/Activity'
import { Button } from '../../components/Button'
import { CaloriesInput } from '../../components/CaloriesInputTS'
import { TimePickCombined } from '../../components/TimePickCombined'
import { addHint } from '../../services/hints'
import { addActivity } from '../../redux/actions'

export const TrainerScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    const dispatch = useDispatch()
    const params = navigation?.state?.params
    const [activity, setActivity] = useState<Partial<IActivity>>({})
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
        // console.log(newAct)
        if (data.type) addHint(activity.activity_type, data.type)
        dispatch(addActivity(newAct))
        navigation.navigate(Routes.Home)
    }

    useEffect(() => {
        // setup activity
        const time_started = timestamp()
        const activity_type = ActivityTypes.Trainer

        setActivity({
            activity_type,
            time_started,
        })
    }, [params])

    useEffect(() => {
        navigation.setParams({
            headerTitle: strings.Trainer,
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
            <OthersPickers
                activity_type={activity.activity_type}
                open={true}
                value={data.type}
                onChange={value => setData({ ...data, type: value })}
            />
            <CaloriesInput
                value={data.calories}
                onChange={v => setData({ ...data, calories: v })}
            />
            <Button title={strings.Save} onPress={submit} />
        </View>
    )
}

TrainerScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}
