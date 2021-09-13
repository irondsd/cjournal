import React, { FC, useEffect, useState, useLayoutEffect } from 'react'
import { View, StatusBar } from 'react-native'
import {
    backgroundColor,
    Routes,
    defaultStyles,
    ActivityTypes,
} from '../../constants'
import { strings } from '../../localization'
import { SettingsButton } from '../../components/SettingsButton'
import { TileLine } from '../../components/tiles'
import { TileOpen } from '../../components/tiles'
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
                <TileOpen
                    name={ActivityTypes.Sleep}
                    disabled={disabled.sleep}
                />
                <TileOpen name={ActivityTypes.Alarm} />
            </TileLine>
            <TileLine>
                <TileOpen
                    name={ActivityTypes.PhysicalLoad}
                    disabled={disabled.physical}
                />
                <TileOpen
                    name={ActivityTypes.Activity}
                    disabled={disabled.activity}
                />
                <TileOpen
                    name={ActivityTypes.EmotionalStress}
                    disabled={disabled.emotional}
                />
            </TileLine>
            <TileLine>
                <TileOpen name={ActivityTypes.Pain} disabled={disabled.pain} />
                <TileOpen
                    name={ActivityTypes.Complaints}
                    disabled={disabled.complaints}
                />
                <TileOpen
                    name={ActivityTypes.Weakness}
                    disabled={disabled.WeaknessTile}
                />
            </TileLine>
            <TileLine>
                <TileOpen
                    name={ActivityTypes.TakingMedicine}
                    disabled={disabled.TakingMedicineTile}
                />
                <TileOpen
                    name={ActivityTypes.Tests}
                    disabled={disabled.tests}
                />
                <TileOpen
                    name={ActivityTypes.Service}
                    disabled={disabled.service}
                />
            </TileLine>
        </View>
    )
}
