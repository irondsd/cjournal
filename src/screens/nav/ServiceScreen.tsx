import React, { useEffect } from 'react'
import { strings } from '../../localization'
import {
    CuffFixTile,
    ElectrodeReplacementTile,
    VerticalPositionCalibrationTile,
} from '../../components/tiles'
import TileWrapper from '../../components/TileWrapper'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

export const ServiceScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    useEffect(() => {
        const title = strings.Service
        navigation.setParams({
            headerTitle: title,
        })
    }, [])

    return (
        <TileWrapper>
            <CuffFixTile navigation={navigation} />
            <ElectrodeReplacementTile navigation={navigation} />
            <VerticalPositionCalibrationTile navigation={navigation} />
        </TileWrapper>
    )
}
