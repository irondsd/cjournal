import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../constants'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import HeadacheTile from '../../components/tiles/HeadacheTile'
import RetrosternalPainTile from '../../components/tiles/RetrosternalPainTile'
import HeartAreaPainTile from '../../components/tiles/HeartAreaPainTile'
import OtherPain from '../../components/tiles/OtherPain'
import TileWrapper from '../../components/TileWrapper'

export default class PainScreen extends Component {
    static navigationOptions = {
        title: strings.Pain,
    }

    render() {
        return (
            <TileWrapper>
                <RetrosternalPainTile navigation={this.props.navigation} />
                <HeartAreaPainTile navigation={this.props.navigation} />
                <HeadacheTile navigation={this.props.navigation} />
                <OtherPain navigation={this.props.navigation} />
            </TileWrapper>
        )
    }
}
