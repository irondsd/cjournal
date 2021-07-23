import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { useDispatch } from 'react-redux'
import { Routes, ActivityTypes, defaultStyles, width } from '../../constants'
import { strings } from '../../localization'
import { addActivity } from '../../redux/actions'
import AudioRecorder from '../../components/AudioRecorder'
import Activity, { IActivity, IAData } from '../../classes/Activity'
import timestamp from '../../helpers/timestamp'
import GPS, { LocationType } from '../../sensors/GPS'
import { Comment } from '../../components/CommentTS'
import { Button } from '../../components/Button'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'

import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/NavContainer'

type AlarmScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Alarm'
>
type AlarmScreenRouteProp = RouteProp<RootStackParamList, 'Alarm'>

type AlarmScreenProps = {
    navigation: AlarmScreenNavigationProp
    route: AlarmScreenRouteProp
}

export const AlarmScreen: FC<AlarmScreenProps> = ({ navigation }) => {
    const dispatch = useDispatch()
    const [activity, setActivity] = useState<Partial<IActivity>>({})
    const [locations, setLocations] = useState<LocationType[]>([])
    const [data, setData] = useState<IAData>({})

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
        const newAct = Activity.init(
            activity.activity_type,
            activity.time_started,
            timestamp(),
            undefined,
            undefined,
            { ...data, locations: locations },
        )
        dispatch(addActivity(newAct))
        navigation.navigate(Routes.Home)
    }

    const startUpdates = () => {
        const GPSClient = new GPS()

        const intervalId = setInterval(() => {
            GPSClient.getPosition()
                .then(position => {
                    setLocations(prev => [...prev, position.coords])
                })
                .catch(() => startUpdates())
        }, 3000)
        return intervalId
    }

    useEffect(() => {
        const intervalId = startUpdates()

        // setup activity
        const time_started = timestamp()
        const activity_type = ActivityTypes.Alarm

        setActivity({
            activity_type,
            time_started,
        })

        navigation.setOptions({
            headerTitle: strings.Alarm,
        })

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    return (
        <View style={defaultStyles.container}>
            <KeyboardAvoidingView
                behavior={'height'}
                style={styles.logoContainer}>
                <Icon
                    style={styles.icon}
                    name={locations.length ? 'location-on' : 'location-off'}
                    size={width / 5}
                    color="#555"
                />
                <Text style={styles.text}>
                    {locations.length === 0
                        ? strings.Locating
                        : strings.FoundLocation}
                </Text>
            </KeyboardAvoidingView>
            <View style={styles.long}>
                <Comment
                    onChange={value => {
                        updateActivityValue('comment', value)
                    }}
                    value={activity.comment}
                />
                <AudioRecorder
                    audioFile={data.audioFile}
                    setAudio={value => updateDataValue('audioFile', value)}
                />
                <Button
                    title={strings.Save}
                    onPress={() => {
                        submit()
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    logoContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: { margin: '10%' },
    text: {
        fontSize: width / 15,
    },
    long: {
        width: '100%',
        flexDirection: 'column',
    },
})
