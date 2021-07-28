import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { Routes, ActivityTypes, defaultStyles, width } from '../../constants'
import { strings } from '../../localization'
import AudioRecorder from '../../components/AudioRecorder'
import timestamp from '../../helpers/timestamp'
import GPS, { LocationType } from '../../sensors/GPS'
import { Comment } from '../../components/CommentTS'
import { Button } from '../../components/Button'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/NavContainer'
import { useMakeActivity } from '../../hooks/useMakeActivity'
import { useActivities } from '../../context/activitiesContext'

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
    const [locations, setLocations] = useState<LocationType[]>([])
    const [activity, updateActivity, updateData] = useMakeActivity({
        activity_type: ActivityTypes.Alarm,
        time_started: timestamp(),
    })
    const { activityAdd } = useActivities()

    const submit = () => {
        const createdActivity = {
            ...activity,
            data: { ...activity.data, locations },
        }
        activityAdd(createdActivity)
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
                        updateActivity('comment', value)
                    }}
                    value={activity.comment}
                />
                <AudioRecorder
                    audioFile={activity.data.audioFile}
                    setAudio={value => updateData('audioFile', value)}
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
