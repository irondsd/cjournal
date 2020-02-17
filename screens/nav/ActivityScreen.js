import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor, activity_types } from '../../properties'
import { strings } from '../../localizations'
import SleepTile from '../../components/tiles/SleepTile'
import WalkingTile from '../../components/tiles/WalkingTile'
import OtherActivity from '../../components/tiles/OtherActivity'
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
                <SleepTile navigation={this.props.navigation} />
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
