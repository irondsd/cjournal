import React, { useEffect } from 'react'
import { View } from 'react-native'
import TileWrapper from '../../components/TileWrapper'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import TileSpacer from '../../components/TileSpacer'
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

export const ActivityScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    useEffect(() => {
        const title = strings['Activity']
        navigation.setParams({
            headerTitle: title,
        })
    }, [])

    return (
        <View>
            <TileWrapper>
                <MealTile navigation={navigation} />
                <AlcoholTile navigation={navigation} />
                <SmokingTile navigation={navigation} />
            </TileWrapper>
            <TileWrapper>
                <SexTile navigation={navigation} />
                <ShowerTile navigation={navigation} />
                <ToiletTile navigation={navigation} />
            </TileWrapper>
            <TileWrapper>
                <TileSpacer />
                <OtherActivityTile navigation={navigation} />
                <TileSpacer />
            </TileWrapper>
        </View>
    )
}

ActivityScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}
