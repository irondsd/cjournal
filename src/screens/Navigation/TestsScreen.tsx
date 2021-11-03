import React, { useEffect } from 'react'
import { View } from 'react-native'
import { strings } from '../../localization'
import { TileInit, TileOpen, TileOpenSender } from '../../components/tiles'
import { TileLine } from '../../components/tiles'
import { TileSpacer } from '../../components/tiles'
import { ActivityTypes, defaultStyles } from '../../constants'

export const TestsScreen = ({ navigation }) => {
    useEffect(() => {
        const title = strings.Tests
        navigation.setOptions({
            headerTitle: title,
        })
    }, [])

    return (
        <View style={defaultStyles.navScreen}>
            <TileLine>
                <TileOpen name={ActivityTypes.Stairs} />
                <TileOpen name={ActivityTypes.WalkingTest} />
                <TileInit name={ActivityTypes.DeepBreathing} />
            </TileLine>
            <TileLine>
                <TileOpenSender name={ActivityTypes.Press} />
                <TileInit name={ActivityTypes.Straining} />
                <TileOpenSender name={ActivityTypes.ActiveOrthostasis} />
            </TileLine>
            <TileLine>
                <TileSpacer />
                <TileInit name={ActivityTypes.PsychoemotionalTest} />
                <TileSpacer />
            </TileLine>
        </View>
    )
}

TestsScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}
