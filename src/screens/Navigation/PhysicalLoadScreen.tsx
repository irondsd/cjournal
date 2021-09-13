import React, { useEffect } from 'react'
import { View } from 'react-native'
import { strings } from '../../localization'
import { TileLine } from '../../components/tiles'
import { TileOpenSender } from '../../components/tiles'
import { ActivityTypes, defaultStyles } from '../../constants'

export const PhysicalLoadScreen = ({ navigation }) => {
    useEffect(() => {
        const title = strings.PhysicalLoad
        navigation.setOptions({
            headerTitle: title,
        })
    }, [])

    return (
        <View style={defaultStyles.navScreen}>
            <TileLine>
                <TileOpenSender name={ActivityTypes.Walking} />
                <TileOpenSender name={ActivityTypes.Running} />
                <TileOpenSender name={ActivityTypes.Bicycling} />
            </TileLine>
            <TileLine>
                <TileOpenSender name={ActivityTypes.Workout} />
                <TileOpenSender name={ActivityTypes.Trainer} />
                <TileOpenSender name={ActivityTypes.OtherLoad} />
            </TileLine>
        </View>
    )
}

PhysicalLoadScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}
