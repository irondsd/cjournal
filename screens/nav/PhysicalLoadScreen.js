import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../properties'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import PhysicalWorkTile from '../../components/tiles/PhysicalWorkTile'
import SexTile from '../../components/tiles/SexTile'
import ToiletTile from '../../components/tiles/ToiletTile'
import SaunaTile from '../../components/tiles/SaunaTile'
import ShowerTile from '../../components/tiles/ShowerTile'
import TileWrapper from '../../components/TileWrapper'

export default class PhysicalLoadScreen extends Component {
    static navigationOptions = {
        title: strings.Activity,
    }

    render() {
        return (
            <TileWrapper>
                <PhysicalWorkTile navigation={this.props.navigation} />
                <SexTile navigation={this.props.navigation} />
                <ToiletTile navigation={this.props.navigation} />
                <SaunaTile navigation={this.props.navigation} />
                <ShowerTile navigation={this.props.navigation} />
            </TileWrapper>
        )
    }
}
