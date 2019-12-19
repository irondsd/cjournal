import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../properties'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import AlcoholTile from '../../components/tiles/AlcoholTile'
import MealTile from '../../components/tiles/MealTile'
import SmokingTile from '../../components/tiles/SmokingTile'
import TileWrapper from '../../components/TileWrapper'

export default class IntakeScreen extends Component {
    static navigationOptions = {
        title: strings.Intake,
    }

    render() {
        return (
            <TileWrapper>
                <MealTile navigation={this.props.navigation} />
                <AlcoholTile navigation={this.props.navigation} />
                <SmokingTile navigation={this.props.navigation} />
            </TileWrapper>
        )
    }
}
