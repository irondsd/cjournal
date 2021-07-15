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
import { TileLine } from '../../components/TileLine'
import { TileSpacer } from '../../components/TileSpacer'
import { defaultStyles } from '../../constants'

export const WeaknessScreen = ({ navigation }) => {
    useEffect(() => {
        const title = strings.Weakness
        navigation.setOptions({
            headerTitle: title,
        })
    }, [])

    return (
        <View style={defaultStyles.tileScreen}>
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

WeaknessScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}
