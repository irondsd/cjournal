import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../properties'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import PsychotherapyTile from '../../components/tiles/PsychotherapyTile'
import IntelectualWorkTile from '../../components/tiles/IntellectualWorkTile'
import GamblingTile from '../../components/tiles/GamblingTile'
import ReadingTile from '../../components/tiles/ReadingTile'
import ViewingTile from '../../components/tiles/ViewingTile'
import RelaxationTile from '../../components/tiles/RelaxationTile'
import TileWrapper from '../../components/TileWrapper'

export default class PsychilogicalActivityScreen extends Component {
    static navigationOptions = {
        title: strings.Activity,
    }

    render() {
        return (
            <TileWrapper>
                <IntelectualWorkTile navigation={this.props.navigation} />
                <GamblingTile navigation={this.props.navigation} />
                <ReadingTile navigation={this.props.navigation} />
                <ViewingTile navigation={this.props.navigation} />
                <PsychotherapyTile navigation={this.props.navigation} />
                <RelaxationTile navigation={this.props.navigation} />
            </TileWrapper>
        )
    }
}
