import React, { useEffect } from 'react'
import { View } from 'react-native'
import { strings } from '../../localization'
import TileWrapper from '../../components/TileWrapper'
import {
    OtherLoadTile,
    RunningTile,
    WalkingTile,
    BicyclingTile,
    TrainerTile,
    WorkoutTile,
} from '../../components/tiles'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

export const PhysicalLoadScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    useEffect(() => {
        const title = strings.PhysicalLoad
        navigation.setParams({
            headerTitle: title,
        })
    }, [])

    return (
        <View>
            <TileWrapper>
                <WalkingTile navigation={navigation} />
                <RunningTile navigation={navigation} />
                <BicyclingTile navigation={navigation} />
            </TileWrapper>
            <TileWrapper>
                <WorkoutTile navigation={navigation} />
                <TrainerTile navigation={navigation} />
                <OtherLoadTile navigation={navigation} />
            </TileWrapper>
        </View>
    )
}
