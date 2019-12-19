import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../properties'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import OrthostasisTile from '../../components/tiles/OrthostasisTile'
import OneTimeTakingofMedicineTile from '../../components/tiles/OneTimeTakingOfMedicineTile'
import TileWrapper from '../../components/TileWrapper'

class TestsScreen extends Component {
    static navigationOptions = {
        title: strings.Activity,
    }

    render() {
        return (
            <TileWrapper>
                {this.props.user.hide_elements.includes(
                    'Orthostasis',
                ) ? null : (
                    <OrthostasisTile navigation={this.props.navigation} />
                )}
                <OneTimeTakingofMedicineTile
                    navigation={this.props.navigation}
                />
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
