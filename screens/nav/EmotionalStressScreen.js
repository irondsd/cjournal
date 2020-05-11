import React, { Component } from 'react'
import { connect } from 'react-redux'
import { strings } from '../../localization'
import PositiveEmotionsTile from '../../components/tiles/PositiveEmotionsTile'
import NegativeEmotionsTile from '../../components/tiles/NegativeEmotionsTile'
import OtherEmotions from '../../components/tiles/OtherEmotions'
import TileWrapper from '../../components/TileWrapper'

export default class EmotionalStressScreen extends Component {
    static navigationOptions = {
        title: strings.EmotionalStress,
    }

    render() {
        return (
            <TileWrapper>
                <PositiveEmotionsTile navigation={this.props.navigation} />
                <NegativeEmotionsTile navigation={this.props.navigation} />
                <OtherEmotions navigation={this.props.navigation} />
            </TileWrapper>
        )
    }
}
