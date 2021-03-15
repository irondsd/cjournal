import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor, activityTypes } from '../constants'
import { strings } from '../localization'
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
import EmotionalStressTile from '../components/tiles/EmotionalStressTile'
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
            Sleep: false,
            PhysicalLoad: false,
            Activity: false,
            Service: false,
            Pills: false,
            Tests: false,
        }

        this.refresh = this.refresh.bind(this)
        this.runSync = this.runSync.bind(this)
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', this.refresh)
    }

    runSync() {
        if (this.props.user._id && this.props.tokens) {
            sync(this.props.user._id, this.props.tokens)
        }
    }

    refresh() {
        let overlaps = overlappingGreying(this.props.activity)
        this.setState({
            Sleep: overlaps[0],
            PhysicalLoad: overlaps[1],
            Activity: overlaps[2],
            Pills: overlaps[3],
            Tests: overlaps[4],
            Service: overlaps[5],
        })

        if (
            overlaps[0] ||
            overlaps[1] ||
            overlaps[2] ||
            overlaps[3] ||
            overlaps[4] ||
            overlaps[5]
        ) {
            setTimeout(() => {
                this.refresh()
            }, 10000)
        } else {
            clearTimeout()
        }
        this.runSync()
    }

    render() {
        return (
            <View>
                <TileWrapper>
                    <SleepTile
                        navigation={this.props.navigation}
                        disabled={this.state.Sleep}
                    />
                    <AlarmTile navigation={this.props.navigation} />
                </TileWrapper>
                <TileWrapper>
                    <PhysicalLoadTile
                        navigation={this.props.navigation}
                        disabled={this.state.PhysicalLoad}
                    />
                    <ActivityTile
                        navigation={this.props.navigation}
                        disabled={this.state.Activity}
                    />
                    <EmotionalStressTile navigation={this.props.navigation} />
                </TileWrapper>
                <TileWrapper>
                    <PainTile navigation={this.props.navigation} />
                    <ComplaintsTile navigation={this.props.navigation} />
                    <WeaknessTile navigation={this.props.navigation} />
                </TileWrapper>
                <TileWrapper>
                    <PillsTile
                        navigation={this.props.navigation}
                        disabled={this.state.Pills}
                    />
                    <TestsTile
                        navigation={this.props.navigation}
                        disabled={this.state.Tests}
                    />
                    <ServiceTile
                        navigation={this.props.navigation}
                        disabled={this.state.Service}
                    />
                </TileWrapper>
            </View>
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