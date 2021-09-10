import React, { useEffect } from 'react'
import { strings } from '../../localization'
import {
    PositiveEmotionsTile,
    OtherEmotionsTile,
    NegativeEmotionsTile,
} from '../../components/tiles'
import { TileLine } from '../../components/TileLine'
import { View } from 'react-native'
import { defaultStyles } from '../../constants'

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
                <PositiveEmotionsTile />
                <NegativeEmotionsTile />
                <OtherEmotionsTile />
            </TileLine>
        </View>
    )
}

EmotionalStressScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}
