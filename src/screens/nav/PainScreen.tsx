import React, { useEffect } from 'react'
import { View } from 'react-native'
import { strings } from '../../localization'
import TileWrapper from '../../components/TileWrapper'
import { TileSpacer } from '../../components/TileSpacer'
import {
    HeadacheTile,
    RetrosternalPainTile,
    HeartAreaPainTile,
    OtherPainTile,
} from '../../components/tiles'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

export const PainScreen: NavigationStackScreenComponent = ({ navigation }) => {
    useEffect(() => {
        const title = strings.Pain
        navigation.setParams({
            headerTitle: title,
        })
    }, [])

    return (
        <View>
            <TileWrapper>
                <RetrosternalPainTile navigation={navigation} />
                <HeartAreaPainTile navigation={navigation} />
                <HeadacheTile navigation={navigation} />
            </TileWrapper>
            <TileWrapper>
                <TileSpacer />
                <OtherPainTile navigation={navigation} />
                <TileSpacer />
            </TileWrapper>
        </View>
    )
}
