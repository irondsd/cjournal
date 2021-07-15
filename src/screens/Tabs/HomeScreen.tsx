import React, { FC, useEffect, useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { connect, useSelector } from 'react-redux'
import {
    backgroundColor,
    appColor,
    ActivityTypes,
    Routes,
    defaultStyles,
} from '../../constants'
import { strings } from '../../localization'
import { SettingsButton } from '../../components/SettingsButton'
import sync from '../../services/sync'
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
import { RootState } from '../../redux/store'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigation/NavContainer'

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

type HomeScreenProps = {
    navigation: HomeScreenNavigationProp
}

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
    const user = useSelector((state: RootState) => state.user)
    const tokens = useSelector((state: RootState) => state.tokens)

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
    }) // todo

    const runSync = () => {
        if (user._id && tokens.access_token) {
            sync(user._id, tokens)
        }
    }

    useEffect(() => {
        // todo disabled
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
                <SleepTile navigation={navigation} disabled={disabled.sleep} />
                <AlarmTile navigation={navigation} />
            </TileLine>
            <TileLine>
                <PhysicalLoadTile
                    navigation={navigation}
                    disabled={disabled.physical}
                />
                <ActivityTile
                    navigation={navigation}
                    disabled={disabled.activity}
                />
                <EmotionalStressTile
                    navigation={navigation}
                    disabled={disabled.emotional}
                />
            </TileLine>
            <TileLine>
                <PainTile navigation={navigation} disabled={disabled.pain} />
                <ComplaintsTile
                    navigation={navigation}
                    disabled={disabled.complaints}
                />
                <WeaknessTile
                    navigation={navigation}
                    disabled={disabled.WeaknessTile}
                />
            </TileLine>
            <TileLine>
                <TakingMedicineTile
                    navigation={navigation}
                    disabled={disabled.TakingMedicineTile}
                />
                <TestsTile navigation={navigation} disabled={disabled.tests} />
                <ServiceTile
                    navigation={navigation}
                    disabled={disabled.service}
                />
            </TileLine>
        </View>
    )
}
