import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../constants'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import CuffFixTile from '../../components/tiles/CuffFixTile'
import ElectrodeReplacementTile from '../../components/tiles/ElectrodeReplacementTile'
import VerticalPositionCalibrationTile from '../../components/tiles/VerticalPositionCalibrationTile'
import TileWrapper from '../../components/TileWrapper'

export default class ServiceScreen extends Component {
    static navigationOptions = {
        title: strings.Service,
    }

    render() {
        return (
            <TileWrapper>
                <CuffFixTile navigation={this.props.navigation} />
                <ElectrodeReplacementTile navigation={this.props.navigation} />
                <VerticalPositionCalibrationTile
                    navigation={this.props.navigation}
                />
            </TileWrapper>
        )
    }
}
