import React, { useEffect } from 'react'
import { View } from 'react-native'
import { TileLine } from '../../components/tiles'
import { TileSpacer } from '../../components/tiles'
import { TileInit, TileOpenSender } from '../../components/tiles'
import { strings } from '../../localization'
import { ActivityTypes, defaultStyles } from '../../constants'

export const ActivityScreen = ({ navigation }) => {
    useEffect(() => {
        const title = strings['Activity']
        navigation.setOptions({
            headerTitle: title,
        })
    }, [])

    return (
        <View style={defaultStyles.navScreen}>
            <TileLine>
                <TileInit name={ActivityTypes.Meal} />
                <TileInit name={ActivityTypes.Alcohol} />
                <TileInit name={ActivityTypes.Smoking} />
            </TileLine>
            <TileLine>
                <TileInit name={ActivityTypes.Sex} />
                <TileInit name={ActivityTypes.Shower} />
                <TileInit name={ActivityTypes.Toilet} />
            </TileLine>
            <TileLine>
                <TileSpacer />
                <TileOpenSender name={ActivityTypes.OtherActivity} />
                <TileSpacer />
            </TileLine>
        </View>
    )
}

ActivityScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}
