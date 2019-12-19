import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../properties'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import DyspneaTile from '../../components/tiles/DyspneaTile'
import TachypneaTile from '../../components/tiles/TachypneaTile'
import TileWrapper from '../../components/TileWrapper'

export default class IntakeScreen extends Component<Props> {
    static navigationOptions = {
        title: strings.DisturbanceOfRespiration,
    }

    render() {
        return (
            <TileWrapper>
                <DyspneaTile navigation={this.props.navigation} />
                <TachypneaTile navigation={this.props.navigation} />
            </TileWrapper>
        )
    }
}
