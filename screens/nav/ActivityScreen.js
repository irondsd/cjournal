import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor, activity_types } from '../../properties'
import { strings } from '../../localizations'
import RestTile from '../../components/tiles/RestTile'
import WalkingTile from '../../components/tiles/WalkingTile'
import StairsTile from '../../components/tiles/StairsTile'
import WorkoutTile from '../../components/tiles/WorkoutTile'
import Barometer from '../../sensors/Barometer'
import TileWrapper from '../../components/TileWrapper'

class ActivityScreen extends Component<Props> {
    static navigationOptions = {
        title: strings.Activity,
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', this.calibrate)
    }

    calibrate() {
        Barometer.calibrate(20)
    }

    render() {
        return (
            <TileWrapper>
                <RestTile navigation={this.props.navigation} />
                {this.props.user.hide_elements.includes(
                    activity_types.Walking,
                ) ? null : (
                    <WalkingTile navigation={this.props.navigation} />
                )}
                {this.props.user.hide_elements.includes(
                    activity_types.Stairs,
                ) ? null : (
                    <StairsTile navigation={this.props.navigation} />
                )}
                <WorkoutTile navigation={this.props.navigation} />
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
