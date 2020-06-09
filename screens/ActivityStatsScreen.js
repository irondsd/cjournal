import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import {
    backgroundColor,
    durations,
    appColor,
    activityTypes,
    paths,
} from '../constants'
import { displayDate, displayTime } from '../helpers/dateTime'
import { strings } from '../localization'
import { updateActivity, deleteActivity } from '../redux/actions/'
import TimePicker from '../components/TimePicker'
import DurationPicker from '../components/DurationPicker'
import DeleteButton from '../components/DeleteButton'
import BackButton from '../components/BackButton'
import Activity from '../classes/Activity'
import { displayDateTime } from '../helpers/dateTime'
import Map from '../components/Map'
import OpenInMaps from '../components/OpenInMaps'

type Props = {}
class ActivityStatsScreen extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            time: '',
            stats: '',
            originalActivity: {
                data: {
                    position: [],
                },
            },
        }

        this.deleteActivity = this.deleteActivity.bind(this)
    }

    static navigationOptions = ({ navigation }) => ({
        title: strings.AtivityStats,
        headerRight: (
            <DeleteButton callback={navigation.state.params.deleteActivity} />
        ),
    })

    deleteActivity = () => {
        this.props.remove(this.state.originalActivity)
        this.props.navigation.navigate(paths.Jounal)
    }

    componentDidMount() {
        this.setState({
            originalActivity: this.props.navigation.state.params,
        })

        this.fillStats()
    }

    componentDidUpdate() {
        if (!this.state.loaded) {
            this.fillStats()
        }
    }

    fillStats = () => {
        if (!this.state.originalActivity.activity_type) return
        let stats = ''
        const data = this.state.originalActivity.data
        console.log(data)

        if (data.hasOwnProperty('state'))
            stats += `${strings.State}: ${data.state}\n`
        if (data.hasOwnProperty('distance'))
            stats += `${strings.CoveredDistance}: ${data.distance} ${
                strings.meters
            }\n`
        if (data.hasOwnProperty('metersMax'))
            stats += `${strings.AscentTo}: ${data.metersMax} ${
                strings.meters
            }\n`
        if (data.hasOwnProperty('steps'))
            stats += `${strings.NumberOfSteps}: ${data.steps} ${
                strings.steps
            }\n`

        this.setState({
            stats: stats,
            loaded: true,
            time: this.setTime(),
        })
    }

    setTime = () => {
        let time
        time = displayDateTime(
            new Date(this.state.originalActivity.time_started * 1000),
        )
        if (
            this.state.originalActivity.time_ended != null &&
            this.state.originalActivity.time_ended != 'null' &&
            this.state.originalActivity.time_ended !=
                this.state.originalActivity.time_started
        ) {
            time +=
                ' — ' +
                displayDateTime(
                    new Date(this.state.originalActivity.time_ended * 1000),
                )
        }

        return time
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.Title}>{`${
                    strings[this.state.originalActivity.activity_type]
                }`}</Text>
                <Text style={styles.Time}>{this.state.time}</Text>
                {this.state.originalActivity.data.position && (
                    <View>
                        <Map
                            coords={this.state.originalActivity.data.position}
                        />
                        <OpenInMaps
                            coords={this.state.originalActivity.data.position}
                        />
                    </View>
                )}
                <Text style={styles.Stats}>{this.state.stats}</Text>
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

const mapDispatchToProps = dispatch => ({
    remove: activity => {
        dispatch(deleteActivity(activity))
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ActivityStatsScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
        flexDirection: 'column',
        padding: 20,
    },
    Title: {
        margin: 30,
        marginBottom: 10,
        fontSize: 30,
        color: 'black',
        textAlign: 'center',
    },
    Time: {
        margin: 30,
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
    },
    Stats: {
        margin: 30,
        fontSize: 20,
        fontWeight: '100',
        color: '#666',
        textAlign: 'center',
        lineHeight: 30,
    },
})
