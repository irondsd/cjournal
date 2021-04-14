import React, { useEffect } from 'react'
import { View } from 'react-native'
import { TileLine }  from '../../components/TileLine'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
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
            <TileLine>
                <MealTile navigation={navigation} />
                <AlcoholTile navigation={navigation} />
                <SmokingTile navigation={navigation} />
            </TileLine>
            <TileLine>
                <SexTile navigation={navigation} />
                <ShowerTile navigation={navigation} />
                <ToiletTile navigation={navigation} />
            </TileLine>
            <TileLine>
                <TileSpacer />
                <OtherActivityTile navigation={navigation} />
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
