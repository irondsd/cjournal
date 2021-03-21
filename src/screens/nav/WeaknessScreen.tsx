import React, { useEffect } from 'react'
import { View } from 'react-native'
import { strings } from '../../localization'
import {
    NauseaTile,
    StupefactionTile,
    OtherWeaknessTile,
    SyncopeTile,
    FatigueTile,
} from '../../components/tiles'
import TileWrapper from '../../components/TileWrapper'
import TileSpacer from '../../components/TileSpacer'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

export const WeaknessScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    useEffect(() => {
        const title = strings.Weakness
        navigation.setParams({
            headerTitle: title,
        })
    }, [])

    return (
        <View>
            <TileWrapper>
                <SyncopeTile navigation={navigation} />
                <NauseaTile navigation={navigation} />
                <StupefactionTile navigation={navigation} />
            </TileWrapper>
            <TileWrapper>
                <FatigueTile navigation={navigation} />
                <OtherWeaknessTile navigation={navigation} />
                <TileSpacer />
            </TileWrapper>
        </View>
    )
}
