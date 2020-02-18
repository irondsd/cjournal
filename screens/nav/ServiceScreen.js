import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../properties'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import CuffFixTile from '../../components/tiles/CuffFixTile'
import ElectrodeReplacementTile from '../../components/tiles/ElectrodeReplacementTile'
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
                {/* <IntelectualWorkTile navigation={this.props.navigation} />
                <GamblingTile navigation={this.props.navigation} />
                <ReadingTile navigation={this.props.navigation} />
                <ViewingTile navigation={this.props.navigation} />
                <PsychotherapyTile navigation={this.props.navigation} />
                <RelaxationTile navigation={this.props.navigation} /> */}
            </TileWrapper>
        )
    }
}
