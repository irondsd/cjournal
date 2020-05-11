import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../constants'
import { strings } from '../../localization'
import sync from '../../services/sync'
import HeadacheTile from '../../components/tiles/HeadacheTile'
import RetrosternalPainTile from '../../components/tiles/RetrosternalPainTile'
import HeartAreaPainTile from '../../components/tiles/HeartAreaPainTile'
import OtherPain from '../../components/tiles/OtherPain'
import TileWrapper from '../../components/TileWrapper'
import TileSpacer from '../../components/TileSpacer'

export default class PainScreen extends Component {
    static navigationOptions = {
        title: strings.Pain,
    }

    render() {
        return (
            <View>
                <TileWrapper>
                    <RetrosternalPainTile navigation={this.props.navigation} />
                    <HeartAreaPainTile navigation={this.props.navigation} />
                    <HeadacheTile navigation={this.props.navigation} />
                </TileWrapper>
                <TileWrapper>
                    <TileSpacer />
                    <OtherPain navigation={this.props.navigation} />
                    <TileSpacer />
                </TileWrapper>
            </View>
        )
    }
}
