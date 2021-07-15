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
        <View style={defaultStyles.tileScreen}>
            <TileLine>
                <StairsTile navigation={navigation} />
                <WalkingTestTile navigation={navigation} />
                <DeepBreathingTile navigation={navigation} />
            </TileLine>
            <TileLine>
                <PressTile navigation={navigation} />
                <StrainingTile navigation={navigation} />
                <ActiveOrthostasisTile navigation={navigation} />
            </TileLine>
            <TileLine>
                <TileSpacer />
                <PsychoemotionalTestTile navigation={navigation} />
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
