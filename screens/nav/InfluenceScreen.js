import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../properties'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import MassageTile from '../../components/tiles/MassageTile'
import PhysiotherapyTile from '../../components/tiles/PhysiotherapyTile'
import Sunbathe from '../../components/tiles/Sunbathe'
import TileWrapper from '../../components/TileWrapper'

export default class IntakeScreen extends Component {
    static navigationOptions = {
        title: strings.Influence,
    }

    render() {
        return (
            <TileWrapper>
                <MassageTile navigation={this.props.navigation} />
                <PhysiotherapyTile navigation={this.props.navigation} />
                <Sunbathe navigation={this.props.navigation} />
            </TileWrapper>
        )
    }
}
