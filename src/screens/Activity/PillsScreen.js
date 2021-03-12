import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import {
    backgroundColor,
    durations,
    paths,
    activityTypes,
    defaultStyles,
    prescriptions,
} from '../../constants'
import {
    NavigationStackScreenComponent,
    NavigationStackScreenProps,
} from 'react-navigation-stack'
import { strings } from '../../localization'
import timestamp from '../../helpers/timestamp'
import { connect } from 'react-redux'
import { addActivity } from '../../redux/actions'
import { findLatestTask } from '../../classes/Task'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { displayDate, displayTime, getUtcOffset } from '../../helpers/dateTime'
import { TimePicker } from '../../components/TimePicker.tsx'
import TakePhoto from '../../components/TakePhoto'
import DropDownInput from '../../components/DropDownInput.tsx'
import SaveButton from '../../components/SaveButton'
import Activity from '../../classes/Activity'

export const PillsScreen = ({ navigation, user, tasks, add }) => {
    const params = navigation?.state?.params
    const [activity, setActivity] = useState({})
    const [data, setData] = useState({})
    const [pillsList, setPillsList] = useState([])

    const updateActivityValue = (key, value) => {
        setActivity({
            ...activity,
            [key]: value,
        })
    }
    const updateDataValue = (key, value) => {
        console.log(key, value)
        setData({
            ...data,
            [key]: value,
        })
    }

    const clearPhoto = () => {
        //
    }

    const submit = () => {
        const newAct = new Activity.init(
            activity.activity_type,
            activity.time_started,
            undefined,
            activity.task,
            undefined,
            data,
        )
        add(newAct)
        navigation.navigate(paths.Home)
    }

    useEffect(() => {
        // setup activity
        const time_started = timestamp()
        const activity_type = params?.sender
        const task = params?.task || findLatestTask(tasks, activity_type)

        setActivity({
            activity_type,
            time_started,
            task,
        })

        // set pills list
        const pillsType = prescriptions[activity_type]
        const patient = user.patient || {}
        const pillsList = patient[pillsType] || []
        setPillsList(pillsList)

        // set up photo
        const photoFile = params.image?.uri
        setData({ photoFile: photoFile })
    }, [params])

    return (
        <View style={defaultStyles.container}>
            <TimePicker
                time={activity.time_started}
                onChange={value => updateActivityValue('time_started', value)}
            />
            <DropDownInput
                placeholder={strings.Drug}
                options={pillsList}
                onChange={value => updateDataValue('pill', value)}
                open={true}
                value={data.pill}
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
            <SaveButton
                style={styles.button}
                title={strings.Save}
                onPress={submit}
            />
        </View>
    )
}

PillsScreen.navigationOptions = {
    title: 'title figure out',
}

function mapStateToProps(state) {
    return {
        user: state.user,
        tasks: state.tasks,
    }
}

const mapDispatchToProps = dispatch => ({
    add: activity => {
        dispatch(addActivity(activity))
    },
})

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
    },
    photo: {
        height: 200,
    },

    button: {
        zIndex: 1,
        flex: 2,
        margin: 20,
        justifyContent: 'flex-end',
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(PillsScreen)
