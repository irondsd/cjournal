import React, { Component } from 'react'
import { connect } from 'react-redux'
import { strings } from '../../localizations'
import HappyTile from '../../components/tiles/HappyTile'
import SadnessTile from '../../components/tiles/SadnessTile'
import AngerTile from '../../components/tiles/AngerTile'
import FearTile from '../../components/tiles/FearTile'
import ExcitementTile from '../../components/tiles/ExcitementTile'
import AnxietyTile from '../../components/tiles/AnxietyTile'
import TileWrapper from '../../components/TileWrapper'

export default class EmotionsScreen extends Component {
    static navigationOptions = {
        title: strings.Influence,
    }

    render() {
        return (
            <TileWrapper>
                <HappyTile navigation={this.props.navigation} />
                <SadnessTile navigation={this.props.navigation} />
                <AngerTile navigation={this.props.navigation} />
                <FearTile navigation={this.props.navigation} />
                <ExcitementTile navigation={this.props.navigation} />
                <AnxietyTile navigation={this.props.navigation} />
            </TileWrapper>
        )
    }
}
