import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor, activity_types } from '../../properties'
import { strings } from '../../localizations'
import TileWrapper from '../../components/TileWrapper'
import SexTile from '../../components/tiles/SexTile'
import ToiletTile from '../../components/tiles/ToiletTile'
import ShowerTile from '../../components/tiles/ShowerTile'
import OtherActivity from '../../components/tiles/OtherActivity'

class ActivityScreen extends Component<Props> {
    static navigationOptions = {
        title: strings.Activity,
    }

    render() {
        return (
            <TileWrapper>
                <SexTile navigation={this.props.navigation} />
                <ToiletTile navigation={this.props.navigation} />
                <ShowerTile navigation={this.props.navigation} />
                <OtherActivity navigation={this.props.navigation} />
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

export default connect(mapStateToProps, null)(ActivityScreen)
