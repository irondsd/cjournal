import React, { useEffect } from 'react'
import { strings } from '../../localization'
import {
    PositiveEmotionsTile,
    OtherEmotionsTile,
    NegativeEmotionsTile,
} from '../../components/tiles'
import { TileLine } from '../../components/TileLine'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

export const EmotionalStressScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    useEffect(() => {
        const title = strings.EmotionalStress
        navigation.setParams({
            headerTitle: title,
        })
    }, [])

    return (
        <TileLine>
            <PositiveEmotionsTile navigation={navigation} />
            <NegativeEmotionsTile navigation={navigation} />
            <OtherEmotionsTile navigation={navigation} />
        </TileLine>
    )
}

EmotionalStressScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}
