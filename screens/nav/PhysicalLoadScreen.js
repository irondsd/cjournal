import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../constants'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import TileWrapper from '../../components/TileWrapper'
import OtherLoad from '../../components/tiles/OtherLoad'
import RunningTile from '../../components/tiles/RunningTile'
import GymWalkingTile from '../../components/tiles/GymWalkingTile'
import BicyclingTile from '../../components/tiles/BicyclingTile'
import GymTile from '../../components/tiles/GymTile'

export default class PhysicalLoadScreen extends Component {
    static navigationOptions = {
        title: strings.Activity,
    }

    render() {
        return (
            <TileWrapper>
                <GymWalkingTile navigation={this.props.navigation} />
                <RunningTile navigation={this.props.navigation} />
                <BicyclingTile navigation={this.props.navigation} />
                <GymTile navigation={this.props.navigation} />
                <OtherLoad navigation={this.props.navigation} />
            </TileWrapper>
        )
    }
}
