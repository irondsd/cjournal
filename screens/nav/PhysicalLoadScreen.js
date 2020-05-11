import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../constants'
import { strings } from '../../localization'
import sync from '../../services/sync'
import TileWrapper from '../../components/TileWrapper'
import OtherLoad from '../../components/tiles/OtherLoad'
import RunningTile from '../../components/tiles/RunningTile'
import NormalWalkingTile from '../../components/tiles/NormalWalkingTile'
import BicyclingTile from '../../components/tiles/BicyclingTile'
import TrainerTile from '../../components/tiles/TrainerTile'
import WorkoutTile from '../../components/tiles/WorkoutTile'
import TileSpacer from '../../components/TileSpacer'

export default class PhysicalLoadScreen extends Component {
    static navigationOptions = {
        title: strings.PhysicalLoad,
    }

    render() {
        return (
            <View>
                <TileWrapper>
                    <NormalWalkingTile navigation={this.props.navigation} />
                    <RunningTile navigation={this.props.navigation} />
                    <BicyclingTile navigation={this.props.navigation} />
                </TileWrapper>
                <TileWrapper>
                    <WorkoutTile navigation={this.props.navigation} />
                    <TrainerTile navigation={this.props.navigation} />
                    <OtherLoad navigation={this.props.navigation} />
                </TileWrapper>
            </View>
        )
    }
}
