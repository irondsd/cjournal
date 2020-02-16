import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../properties'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import AnginalPainTile from '../../components/tiles/AnginousPainTile'
import RetrosternalPainTile from '../../components/tiles/RetrosternalPainTile'
import HeartAreaPainTile from '../../components/tiles/HeartAreaPainTile'
import TileWrapper from '../../components/TileWrapper'

export default class IntakeScreen extends Component {
    static navigationOptions = {
        title: strings.Pain,
    }

    render() {
        return (
            <TileWrapper>
                <AnginalPainTile navigation={this.props.navigation} />
                <RetrosternalPainTile navigation={this.props.navigation} />
                <HeartAreaPainTile navigation={this.props.navigation} />
            </TileWrapper>
        )
    }
}
