import React, { useState, useEffect } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
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
import { TimeSwitch, TimeSwitchValues } from '../../components/TimeSwitchTS'
import { DurationPicker } from '../../components/DurationPickerTS'
import { TimePickCombined } from '../../components/TimePickCombined'

type OtherActivityType = {
    activity_type?: string
    time_started?: number
    time_ended?: number
}

const OtherScreen: NavigationStackScreenComponent = ({ navigation }) => {
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const params = navigation?.state?.params
    const [activity, setActivity] = useState<OtherActivityType>({})
    const [data, setData] = useState<IAData>({})
    const [from, setFrom] = useState<TimeSwitchValues>(
        TimeSwitchValues.fromStart,
    )
    const [duration, setDuration] = useState(0)

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

    const submit = () => {
        // const newAct = Activity.init(
        //     activity.activity_type!,
        //     activity.time_started!,
        //     undefined,
        //     undefined,
        //     undefined,
        //     data,
        // )
        // dispatch(addActivity(newAct))
        // navigation.navigate(paths.Home)
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
                onChange={(v, t) => console.log(v, t)}
            />
            {/* <View
                style={
                    Platform.OS === 'ios'
                        ? { zIndex: 10, width: '100%' }
                        : { width: '100%' }
                }>
                <DropDownInput
                    list={this.state.list}
                    open={true}
                    onChangeText={text => {
                        this.setState({
                            type: text,
                        })
                    }}
                />
            </View>
            <AudioRecorder
                audioFile={this.state.audioFile}
                setAudio={this.setAudio}
            /> */}
            <Button title={strings.Save} onPress={submit} />
        </View>
    )
}

OtherScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}

export default OtherScreen
