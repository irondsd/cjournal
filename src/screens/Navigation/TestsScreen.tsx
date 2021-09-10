import React, { useEffect } from 'react'
import { View } from 'react-native'
import { strings } from '../../localization'
import {
    WalkingTestTile,
    StairsTile,
    PsychoemotionalTestTile,
    PressTile,
    StrainingTile,
    ActiveOrthostasisTile,
    DeepBreathingTile,
} from '../../components/tiles'
import { TileLine } from '../../components/TileLine'
import { TileSpacer } from '../../components/TileSpacer'
import { defaultStyles } from '../../constants'

export const TestsScreen = ({ navigation }) => {
    useEffect(() => {
        const title = strings.Tests
        navigation.setOptions({
            headerTitle: title,
        })
    }, [])

    return (
        <View style={defaultStyles.navScreen}>
            <TileLine>
                <StairsTile />
                <WalkingTestTile />
                <DeepBreathingTile />
            </TileLine>
            <TileLine>
                <PressTile />
                <StrainingTile />
                <ActiveOrthostasisTile />
            </TileLine>
            <TileLine>
                <TileSpacer />
                <PsychoemotionalTestTile />
                <TileSpacer />
            </TileLine>
        </View>
    )
}

TestsScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}
