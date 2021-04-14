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
import { TileLine }  from '../../components/TileLine'
import { TileSpacer } from '../../components/TileSpacer'
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
            <TileLine>
                <SyncopeTile navigation={navigation} />
                <NauseaTile navigation={navigation} />
                <StupefactionTile navigation={navigation} />
            </TileLine>
            <TileLine>
                <FatigueTile navigation={navigation} />
                <OtherWeaknessTile navigation={navigation} />
                <TileSpacer />
            </TileLine>
        </View>
    )
}
