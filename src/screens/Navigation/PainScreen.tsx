import React, { useEffect } from 'react'
import { View } from 'react-native'
import { strings } from '../../localization'
import { TileLine } from '../../components/TileLine'
import { TileSpacer } from '../../components/TileSpacer'
import {
    HeadacheTile,
    RetrosternalPainTile,
    HeartAreaPainTile,
    OtherPainTile,
} from '../../components/tiles'
import { defaultStyles } from '../../constants'

export const PainScreen = ({ navigation }) => {
    useEffect(() => {
        const title = strings.Pain
        navigation.setOptions({
            headerTitle: title,
        })
    }, [])

    return (
        <View style={defaultStyles.navScreen}>
            <TileLine>
                <RetrosternalPainTile navigation={navigation} />
                <HeartAreaPainTile navigation={navigation} />
                <HeadacheTile navigation={navigation} />
            </TileLine>
            <TileLine>
                <TileSpacer />
                <OtherPainTile navigation={navigation} />
                <TileSpacer />
            </TileLine>
        </View>
    )
}

PainScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}
