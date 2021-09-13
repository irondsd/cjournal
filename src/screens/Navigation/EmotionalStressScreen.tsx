import React, { useEffect } from 'react'
import { strings } from '../../localization'
import { TileInit } from '../../components/tiles'
import { TileLine, TileOpenSender } from '../../components/tiles'
import { View } from 'react-native'
import { ActivityTypes, defaultStyles } from '../../constants'

export const EmotionalStressScreen = ({ navigation }) => {
    useEffect(() => {
        const title = strings.EmotionalStress
        navigation.setOptions({
            headerTitle: title,
        })
    }, [])

    return (
        <View style={defaultStyles.navScreen}>
            <TileLine>
                <TileInit name={ActivityTypes.PositiveEmotions} />
                <TileInit name={ActivityTypes.NegativeEmotions} />
                <TileOpenSender name={ActivityTypes.OtherEmotions} />
            </TileLine>
        </View>
    )
}

EmotionalStressScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}
