import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../properties'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import ArrhythmiaTile from '../../components/tiles/ArrhythmiaTile'
import PalpitationTile from '../../components/tiles/PalpitationTile'
import TileWrapper from '../../components/TileWrapper'

export default class IntakeScreen extends Component {
    static navigationOptions = {
        title: strings.CardiacRhythmDisturbance,
    }

    render() {
        return (
            <TileWrapper>
                <ArrhythmiaTile navigation={this.props.navigation} />
                <PalpitationTile navigation={this.props.navigation} />
            </TileWrapper>
        )
    }
}
