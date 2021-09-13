import React, { useEffect } from 'react'
import { strings } from '../../localization'
import { TileInit, TileOpenSender } from '../../components/tiles'
import { TileLine } from '../../components/tiles'
import { ActivityTypes } from '../../constants'

export const ServiceScreen = ({ navigation }) => {
    useEffect(() => {
        const title = strings.Service
        navigation.setOptions({
            headerTitle: title,
        })
    }, [])

    return (
        <TileLine>
            <TileInit name={ActivityTypes.CuffFix} />
            <TileInit name={ActivityTypes.ElectrodeReplacement} />
            <TileOpenSender name={ActivityTypes.VerticalPositionCalibration} />
        </TileLine>
    )
}

ServiceScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('headerTitle'),
    }
}
