import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../constants'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import FaintTile from '../../components/tiles/FaintTile'
import StupefactionTile from '../../components/tiles/StupefactionTile'
import VisionDisturbancesTile from '../../components/tiles/VisionDisturbancesTile'
import OtherWeakness from '../../components/tiles/OtherWeakness'
import SyncopeTile from '../../components/tiles/SyncopeTile'
import TileWrapper from '../../components/TileWrapper'
import TileSpacer from '../../components/TileSpacer'

export default class WeaknessScreen extends Component {
    static navigationOptions = {
        title: strings.Weakness,
    }

    render() {
        return (
            <View>
                <TileWrapper>
                    <SyncopeTile navigation={this.props.navigation} />
                    <FaintTile navigation={this.props.navigation} />
                    <StupefactionTile navigation={this.props.navigation} />
                </TileWrapper>
                <TileWrapper>
                    <VisionDisturbancesTile
                        navigation={this.props.navigation}
                    />
                    <TileSpacer />
                    <OtherWeakness navigation={this.props.navigation} />
                </TileWrapper>
            </View>
        )
    }
}
