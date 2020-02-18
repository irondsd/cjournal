import React, { Component } from 'react'
import { connect } from 'react-redux'
import { strings } from '../../localizations'
import PositiveTile from '../../components/tiles/PositiveTile'
import NegativeTile from '../../components/tiles/NegativeTile'
import OtherEmotions from '../../components/tiles/OtherEmotions'
import TileWrapper from '../../components/TileWrapper'

export default class EmotionsScreen extends Component {
    static navigationOptions = {
        title: strings.EmotionalStress,
    }

    render() {
        return (
            <TileWrapper>
                <PositiveTile navigation={this.props.navigation} />
                <NegativeTile navigation={this.props.navigation} />
                <OtherEmotions navigation={this.props.navigation} />
            </TileWrapper>
        )
    }
}
