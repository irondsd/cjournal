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
import TileWrapper from '../../components/TileWrapper'

class TestsScreen extends Component {
    static navigationOptions = {
        title: strings.Tests,
    }

    render() {
        return (
            <View>
                <TileWrapper>
                    <WalkingTile navigation={this.props.navigation} />
                    <StairsTile navigation={this.props.navigation} />
                </TileWrapper>
                <TileWrapper>
                    <PsychoemotionalTestTile
                        navigation={this.props.navigation}
                    />
                    <PressTile navigation={this.props.navigation} />
                    <StrainingTile navigation={this.props.navigation} />
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
