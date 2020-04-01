import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../constants'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import WalkingTile from '../../components/tiles/WalkingTile'
import StairsTile from '../../components/tiles/StairsTile'
import PsychoemotionalTestTile from '../../components/tiles/PsychoemotionalTestTile'
import PressTile from '../../components/tiles/PressTile'
import StrainingTile from '../../components/tiles/StrainingTile'
import OrthostasisTile from '../../components/tiles/OrthostasisTile'
import DeepBreathingTile from '../../components/tiles/DeepBreathingTile'
import TileWrapper from '../../components/TileWrapper'
import TileSpacer from '../../components/TileSpacer'

class TestsScreen extends Component {
    static navigationOptions = {
        title: strings.Tests,
    }

    render() {
        return (
            <View>
                <TileWrapper>
                    <StairsTile navigation={this.props.navigation} />
                    <WalkingTile navigation={this.props.navigation} />
                    <PressTile navigation={this.props.navigation} />
                </TileWrapper>
                <TileWrapper>
                    <StrainingTile navigation={this.props.navigation} />
                    <OrthostasisTile navigation={this.props.navigation} />
                    <PsychoemotionalTestTile
                        navigation={this.props.navigation}
                    />
                </TileWrapper>
                <TileWrapper>
                    <TileSpacer />
                    <DeepBreathingTile navigation={this.props.navigation} />
                    <TileSpacer />
                </TileWrapper>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        activity: state.activity,
    }
}

export default connect(mapStateToProps, null)(TestsScreen)
