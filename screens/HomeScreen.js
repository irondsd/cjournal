import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor, activity_types } from '../properties'
import { strings } from '../localizations'
import SettingsButton from '../components/SettingsButton'
import sync from '../services/sync'
import ActivityTile from '../components/tiles/ActivityTile'
import PhysicalActivityTile from '../components/tiles/PhysicalActivityTile'
import PsychologicalActivityTile from '../components/tiles/PsychologicalActivityTile'
import InfluenceTile from '../components/tiles/InfluenceTile'
import IntakeTile from '../components/tiles/IntakeTile'
import PillsTile from '../components/tiles/PillsTile'
import ChestPainTile from '../components/tiles/ChestPainTile'
import CardiacRhythmDisturbanceTile from '../components/tiles/CardiacRhythmDisturbanceTile'
import DisturbanceOfRaspirationTile from '../components/tiles/DisturbanceOfRaspirationTile'
import WeaknessTile from '../components/tiles/WeaknessTile'
import TestsTile from '../components/tiles/TestsTile'
import EmotionsTile from '../components/tiles/EmotionsTile'
import TroubleButton from '../components/TroubleButton'
import { overlappingGreying, overlappingTime } from '../helpers/activityOverlap'

class HomeScreen extends Component {
    static navigationOptions = {
        title: strings.Home,
        headerRight: <SettingsButton />,
    }

    constructor(props) {
        super(props)

        this.state = {
            Activity: false,
            PhysicalActivity: false,
            PsychologicalActivity: false,
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
        sync(this.props.user.id, this.props.user.api_key)
    }

    refresh() {
        let Activity = overlappingGreying(
            this.props.activity,
            activity_types.Activity,
        )
        let PhysicalActivity = overlappingGreying(
            this.props.activity,
            activity_types.PhysicalActivity,
        )
        let PsychologicalActivity = overlappingGreying(
            this.props.activity,
            activity_types.PsychologicalActivity,
        )
        let Influence = overlappingGreying(
            this.props.activity,
            activity_types.Influence,
        )
        let Intake = overlappingGreying(
            this.props.activity,
            activity_types.Intake,
        )
        let Tests = overlappingGreying(
            this.props.activity,
            activity_types.Tests,
        )

        this.setState({
            Activity: Activity,
            PhysicalActivity: PhysicalActivity,
            PsychologicalActivity: PsychologicalActivity,
            Influence: Influence,
            Intake: Intake,
            Tests: Tests,
        })

        if (
            Activity ||
            PhysicalActivity ||
            PsychologicalActivity ||
            Influence ||
            Intake ||
            Tests
        ) {
            // disabled, let's update every 10 seconds
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
            <View style={styles.activityBox}>
                <StatusBar
                    backgroundColor={'white'}
                    barStyle="dark-content"
                    // hidden={true}
                />
                <TroubleButton navigation={this.props.navigation} />
                <ActivityTile
                    navigation={this.props.navigation}
                    disabled={this.state.Activity}
                />
                <PhysicalActivityTile
                    navigation={this.props.navigation}
                    disabled={this.state.PhysicalActivity}
                />
                <PsychologicalActivityTile
                    navigation={this.props.navigation}
                    disabled={this.state.PsychologicalActivity}
                />
                <InfluenceTile
                    navigation={this.props.navigation}
                    disabled={this.state.Influence}
                />
                <IntakeTile
                    navigation={this.props.navigation}
                    disabled={this.state.Intake}
                />
                <PillsTile navigation={this.props.navigation} />
                <ChestPainTile navigation={this.props.navigation} />
                <CardiacRhythmDisturbanceTile
                    navigation={this.props.navigation}
                />
                <DisturbanceOfRaspirationTile
                    navigation={this.props.navigation}
                />
                <WeaknessTile navigation={this.props.navigation} />
                <EmotionsTile navigation={this.props.navigation} />
                <TestsTile
                    navigation={this.props.navigation}
                    disabled={this.state.Tests}
                />
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

export default connect(mapStateToProps, null)(HomeScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor,
    },
    activityBox: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: backgroundColor,
        justifyContent: 'center',
    },
})
