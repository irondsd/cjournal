import React, { useEffect } from 'react'
import { View } from 'react-native'
import { TileLine } from '../../components/TileLine'
import { TileSpacer } from '../../components/TileSpacer'
import {
    SexTile,
    ToiletTile,
    ShowerTile,
    OtherActivityTile,
    AlcoholTile,
    MealTile,
    SmokingTile,
} from '../../components/tiles'
import { strings } from '../../localization'
import { defaultStyles } from '../../constants'

export const ActivityScreen = ({ navigation }) => {
    useEffect(() => {
        const title = strings['Activity']
        navigation.setOptions({
            headerTitle: title,
        })
    }, [])

    return (
        <View style={defaultStyles.navScreen}>
            <TileLine>
                <MealTile />
                <AlcoholTile />
                <SmokingTile />
            </TileLine>
            <TileLine>
                <SexTile />
                <ShowerTile />
                <ToiletTile />
            </TileLine>
            <TileLine>
                <TileSpacer />
                <OtherActivityTile />
                <TileSpacer />
            </TileLine>
        </View>
    )
}

ActivityScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}
