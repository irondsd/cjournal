import React, { useEffect } from 'react'
import { View } from 'react-native'
import { strings } from '../../localization'
import {
    WalkingTile,
    StairsTile,
    PsychoemotionalTestTile,
    PressTile,
    StrainingTile,
    ActiveOrthostasisTile,
    DeepBreathingTile,
} from '../../components/tiles'
import TileWrapper from '../../components/TileWrapper'
import TileSpacer from '../../components/TileSpacer'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

export const TestsScreen: NavigationStackScreenComponent = ({ navigation }) => {
    useEffect(() => {
        const title = strings.Tests
        navigation.setParams({
            headerTitle: title,
        })
    }, [])

    return (
        <View>
            <TileWrapper>
                <StairsTile navigation={navigation} />
                <WalkingTile navigation={navigation} />
                <DeepBreathingTile navigation={navigation} />
            </TileWrapper>
            <TileWrapper>
                <PressTile navigation={navigation} />
                <StrainingTile navigation={navigation} />
                <ActiveOrthostasisTile navigation={navigation} />
            </TileWrapper>
            <TileWrapper>
                <TileSpacer />
                <PsychoemotionalTestTile navigation={navigation} />
                <TileSpacer />
            </TileWrapper>
        </View>
    )
}
