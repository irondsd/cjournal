import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor, activityTypes } from '../constants'
import { strings } from '../localizations'
import SettingsButton from '../components/SettingsButton'
import sync from '../services/sync'
import ActivityTile from '../components/tiles/ActivityTile'
import PhysicalLoadTile from '../components/tiles/PhysicalLoadTile'
import ServiceTile from '../components/tiles/ServiceTile'
import PillsTile from '../components/tiles/PillsTile'
import PainTile from '../components/tiles/PainTile'
import ComplaintsTile from '../components/tiles/ComplaintsTile'
import WeaknessTile from '../components/tiles/WeaknessTile'
import TestsTile from '../components/tiles/TestsTile'
import EmotionsTile from '../components/tiles/EmotionsTile'
import { overlappingGreying, overlappingTime } from '../helpers/activityOverlap'
import TileWrapper from '../components/TileWrapper'
import SleepTile from '../components/tiles/SleepTile'
import AlarmTile from '../components/tiles/AlarmTile'

class HomeScreen extends Component {
    static navigationOptions = {
        title: strings.Home,
        headerRight: <SettingsButton />,
    }

    constructor(props) {
        super(props)

        this.state = {
            Activity: false,
            PhysicalLoad: false,
            Service: false,
            Influence: false,
            Intake: false,
            Tests: false,
        }

        this.refresh = this.refresh.bind(this)
        this.runSync = this.runSync.bind(this)
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', this.refresh)
    }

    runSync() {
        if (this.props.user.id && this.props.tokens)
            sync(this.props.user.id, this.props.tokens)
    }

    refresh() {
        // TODO: rework
        // let Activity = overlappingGreying(
        //     this.props.activity,
        //     activityTypes.Activity,
        // )
        // let PhysicalLoad = overlappingGreying(
        //     this.props.activity,
        //     activityTypes.PhysicalLoad,
        // )
        // let Service = overlappingGreying(
        //     this.props.activity,
        //     activityTypes.Service,
        // )
        // let Influence = overlappingGreying(
        //     this.props.activity,
        //     activityTypes.Influence,
        // )
        // let Intake = overlappingGreying(
        //     this.props.activity,
        //     activityTypes.Intake,
        // )
        // let Tests = overlappingGreying(
        //     this.props.activity,
        //     activityTypes.Tests,
        // )
        // this.setState({
        //     Activity: Activity,
        //     PhysicalLoad: PhysicalLoad,
        //     Service: Service,
        //     Influence: Influence,
        //     Intake: Intake,
        //     Tests: Tests,
        // })
        // if (
        //     Activity ||
        //     PhysicalLoad ||
        //     Service ||
        //     Influence ||
        //     Intake ||
        //     Tests
        // ) {
        //     // disabled, let's update every 10 seconds
        //     setTimeout(() => {
        //         this.refresh()
        //     }, 10000)
        // } else {
        //     clearTimeout()
        // }
        // this.runSync()
    }

    render() {
        return (
            <TileWrapper>
                <StatusBar
                    backgroundColor={'white'}
                    barStyle="dark-content"
                    // hidden={true}
                />
                <SleepTile navigation={this.props.navigation} />
                <AlarmTile navigation={this.props.navigation} />
                <PhysicalLoadTile
                    navigation={this.props.navigation}
                    // disabled={this.state.PhysicalLoad}
                />
                <ActivityTile
                    navigation={this.props.navigation}
                    // disabled={this.state.Activity}
                />
                <PillsTile navigation={this.props.navigation} />
                <EmotionsTile navigation={this.props.navigation} />
                <PainTile navigation={this.props.navigation} />
                <ComplaintsTile navigation={this.props.navigation} />
                <WeaknessTile navigation={this.props.navigation} />
                <TestsTile
                    navigation={this.props.navigation}
                    // disabled={this.state.Tests}
                />
                <ServiceTile
                    navigation={this.props.navigation}
                    // disabled={this.state.Service}
                />
            </TileWrapper>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        tokens: state.tokens,
        activity: state.activity,
    }
}

export default connect(mapStateToProps, null)(HomeScreen)
