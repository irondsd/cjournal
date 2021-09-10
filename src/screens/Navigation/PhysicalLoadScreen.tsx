import React, { useEffect } from 'react'
import { View } from 'react-native'
import { strings } from '../../localization'
import { TileLine } from '../../components/TileLine'
import {
    OtherLoadTile,
    RunningTile,
    WalkingTile,
    BicyclingTile,
    TrainerTile,
    WorkoutTile,
} from '../../components/tiles'
import { defaultStyles } from '../../constants'

export const PhysicalLoadScreen = ({ navigation }) => {
    useEffect(() => {
        const title = strings.PhysicalLoad
        navigation.setOptions({
            headerTitle: title,
        })
    }, [])

    return (
        <View style={defaultStyles.navScreen}>
            <TileLine>
                <WalkingTile />
                <RunningTile />
                <BicyclingTile />
            </TileLine>
            <TileLine>
                <WorkoutTile />
                <TrainerTile />
                <OtherLoadTile />
            </TileLine>
        </View>
    )
}

PhysicalLoadScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}
