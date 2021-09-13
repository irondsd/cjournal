import React, { useEffect } from 'react'
import { View } from 'react-native'
import { strings } from '../../localization'
import { TileLine } from '../../components/tiles'
import { TileSpacer } from '../../components/tiles'
import { TileInit, TileOpenSender } from '../../components/tiles'
import { ActivityTypes, defaultStyles } from '../../constants'

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
                <TileInit name={ActivityTypes.RetrosternalPain} />
                <TileInit name={ActivityTypes.HeartAreaPain} />
                <TileInit name={ActivityTypes.Headache} />
            </TileLine>
            <TileLine>
                <TileSpacer />
                <TileOpenSender name={ActivityTypes.OtherPain} />
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
