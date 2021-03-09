import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../constants'
import { strings } from '../../localization'
import sync from '../../services/sync'
import WalkingTile from '../../components/tiles/WalkingTile'
import StairsTile from '../../components/tiles/StairsTile'
import PsychoemotionalTestTile from '../../components/tiles/PsychoemotionalTestTile'
import PressTile from '../../components/tiles/PressTile'
import StrainingTile from '../../components/tiles/StrainingTile'
import ActiveOrthostasisTile from '../../components/tiles/ActiveOrthostasisTile'
import DeepBreathingTile from '../../components/tiles/DeepBreathingTile'
import TileWrapper from '../../components/TileWrapper'
import TileSpacer from '../../components/TileSpacer'
import Barometer from '../../sensors/Barometer'

class TestsScreen extends Component {
    static navigationOptions = {
        title: strings.Tests,
    }

    componentDidMount() {
        Barometer.calibrate()
    }

    render() {
        return (
            <View>
                <TileWrapper>
                    <StairsTile navigation={this.props.navigation} />
                    <WalkingTile navigation={this.props.navigation} />
                    <DeepBreathingTile navigation={this.props.navigation} />
                </TileWrapper>
                <TileWrapper>
                    <PressTile navigation={this.props.navigation} />
                    <StrainingTile navigation={this.props.navigation} />
                    <ActiveOrthostasisTile navigation={this.props.navigation} />
                </TileWrapper>
                <TileWrapper>
                    <TileSpacer />
                    <PsychoemotionalTestTile
                        navigation={this.props.navigation}
                    />
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

export default connect(
    mapStateToProps,
    null,
)(TestsScreen)
