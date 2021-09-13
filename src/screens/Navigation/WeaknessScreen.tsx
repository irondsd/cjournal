import React, { useEffect } from 'react'
import { View } from 'react-native'
import { strings } from '../../localization'
import { TileInit, TileOpenSender } from '../../components/tiles'
import { TileLine } from '../../components/tiles'
import { TileSpacer } from '../../components/tiles'
import { ActivityTypes, defaultStyles } from '../../constants'

export const WeaknessScreen = ({ navigation }) => {
    useEffect(() => {
        const title = strings.Weakness
        navigation.setOptions({
            headerTitle: title,
        })
    }, [])

    return (
        <View style={defaultStyles.navScreen}>
            <TileLine>
                <TileInit name={ActivityTypes.Syncope} />
                <TileInit name={ActivityTypes.Nausea} />
                <TileInit name={ActivityTypes.Stupefaction} />
            </TileLine>
            <TileLine>
                <TileInit name={ActivityTypes.Fatigue} />
                <TileOpenSender name={ActivityTypes.OtherWeakness} />
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
