import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../properties'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import TileWrapper from '../../components/TileWrapper'
import OtherLoad from '../../components/tiles/OtherLoad'
import GymTile from '../../components/tiles/GymTile'

export default class PhysicalLoadScreen extends Component {
    static navigationOptions = {
        title: strings.Activity,
    }

    render() {
        return (
            <TileWrapper>
                <GymTile navigation={this.props.navigation} />
                <OtherLoad navigation={this.props.navigation} />
            </TileWrapper>
        )
    }
}
