import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../properties'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import WalkingTile from '../../components/tiles/WalkingTile'
import StairsTile from '../../components/tiles/StairsTile'
import TileWrapper from '../../components/TileWrapper'

class TestsScreen extends Component {
    static navigationOptions = {
        title: strings.Tests,
    }

    render() {
        return (
            <TileWrapper>
                <WalkingTile navigation={this.props.navigation} />
                <StairsTile navigation={this.props.navigation} />
            </TileWrapper>
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
