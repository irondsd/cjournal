import React, { FC, useEffect, useState, useLayoutEffect } from 'react'
import { View, StatusBar } from 'react-native'
import { backgroundColor, Routes, defaultStyles } from '../../constants'
import { strings } from '../../localization'
import { SettingsButton } from '../../components/SettingsButton'
import { TileLine } from '../../components/TileLine'
import {
    ActivityTile,
    PhysicalLoadTile,
    ServiceTile,
    TakingMedicineTile,
    PainTile,
    ComplaintsTile,
    WeaknessTile,
    TestsTile,
    EmotionalStressTile,
    SleepTile,
    AlarmTile,
} from '../../components/tiles'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigation/NavContainer'
import { useSync } from '../../hooks/useSync'

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

type HomeScreenProps = {
    navigation: HomeScreenNavigationProp
}

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
    const { syncActivities } = useSync()

    const [disabled, setDisabled] = useState({
        sleep: false,
        physical: false,
        activity: false,
        emotional: false,
        pain: false,
        complaints: false,
        WeaknessTile: false,
        TakingMedicineTile: false,
        tests: false,
        service: false,
    })

    useEffect(() => {
        const focusUnsub = navigation.addListener('focus', () =>
            syncActivities(),
        )

        return () => {
            focusUnsub()
        }
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: strings.Home,
            headerRight: () => (
                <SettingsButton
                    onPress={() => navigation.navigate(Routes.Settings)}
                />
            ),
        })
    }, [navigation])

    return (
        <View style={defaultStyles.navScreen}>
            <StatusBar
                backgroundColor={backgroundColor}
                barStyle="dark-content"
            />
            <TileLine>
                <SleepTile disabled={disabled.sleep} />
                <AlarmTile />
            </TileLine>
            <TileLine>
                <PhysicalLoadTile disabled={disabled.physical} />
                <ActivityTile disabled={disabled.activity} />
                <EmotionalStressTile disabled={disabled.emotional} />
            </TileLine>
            <TileLine>
                <PainTile disabled={disabled.pain} />
                <ComplaintsTile disabled={disabled.complaints} />
                <WeaknessTile disabled={disabled.WeaknessTile} />
            </TileLine>
            <TileLine>
                <TakingMedicineTile disabled={disabled.TakingMedicineTile} />
                <TestsTile disabled={disabled.tests} />
                <ServiceTile disabled={disabled.service} />
            </TileLine>
        </View>
    )
}
