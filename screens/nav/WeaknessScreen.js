import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../properties'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import FaintTile from '../../components/tiles/FaintTile'
import StupefactionTile from '../../components/tiles/StupefactionTile'
import NauseaTile from '../../components/tiles/NauseaTile'
import VisionDisturbancesTile from '../../components/tiles/VisionDisturbancesTile'
import FatigueTile from '../../components/tiles/FatigueTile'
import TileWrapper from '../../components/TileWrapper'

export default class WeaknessScreen extends Component {
    static navigationOptions = {
        title: strings.Weakness,
    }

    render() {
        return (
            <TileWrapper>
                <FaintTile navigation={this.props.navigation} />
                <StupefactionTile navigation={this.props.navigation} />
                <NauseaTile navigation={this.props.navigation} />
                <VisionDisturbancesTile navigation={this.props.navigation} />
                <FatigueTile navigation={this.props.navigation} />
            </TileWrapper>
        )
    }
}
