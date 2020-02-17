import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity,
    Picker,
    Platform,
    Alert,
} from 'react-native'
import { connect } from 'react-redux'
import {
    backgroundColor,
    durations,
    appColor,
    activity_types,
    editable,
    paths,
} from '../properties'
import { displayDate, displayTime } from '../helpers/dateTime'
import { strings } from '../localizations'
import { updateActivity, deleteActivity } from '../redux/actions/'
import TimePicker from '../components/TimePicker'
import DurationPicker from '../components/DurationPicker'
import PillPicker from '../components/PillPicker'
import DeleteButton from '../components/DeleteButton'
import { overlappingGreying } from '../helpers/activityOverlap'
import BackButton from '../components/BackButton'
import Activity from '../classes/Activity'
import { displayDateTime } from '../helpers/dateTime'

type Props = {}
class ActivityStatsScreen extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            stats: '',
        }

        this.goBack = this.goBack.bind(this)
        this.deleteActivity = this.deleteActivity.bind(this)
        this.updateStats = this.updateStats.bind(this)
    }

    goBack() {
        this.props.navigation.navigate(paths.Jounal)
    }

    static navigationOptions = ({ navigation }) => ({
        title: strings.AtivityStats,
        headerRight: (
            <DeleteButton callback={navigation.state.params.deleteActivity} />
        ),
        // headerLeft: <BackButton goBack={navigation.state.params.goBack} />
    })

    deleteActivity = () => {
        this.props.remove(this.state.originalActivity)
        this.props.navigation.navigate(paths.Jounal)
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', this.updateStats)
        this.setState({
            originalActivity: this.props.navigation.state.params,
        })
    }

    updateStats() {
        let stats = ''
        let data = this.props.navigation.state.params.data
        this.props.navigation.setParams({ deleteActivity: this.deleteActivity })
        this.props.navigation.setParams({ goBack: this.goBack })

        switch (this.props.navigation.state.params.activity_type) {
            case activity_types.Walking:
                if (this.props.navigation.state.params.data) {
                    stats = `${strings.YouWalked} ${this.props.navigation.state.params.data.distance} ${strings.Meters} ${strings.and} ${this.props.navigation.state.params.data.steps} ${strings.Steps}`
                }
                break
            case activity_types.Stairs:
                stats =
                    strings.YouClimbed +
                    ' ' +
                    this.props.navigation.state.params.data.meters +
                    ' ' +
                    strings.Meters
                break
            case activity_types.GymWalking:
                stats =
                    strings.Steps +
                    ': ' +
                    this.props.navigation.state.params.data.steps +
                    '\n' +
                    strings.Meters +
                    ': ' +
                    this.props.navigation.state.params.data.distance
                break
            case activity_types.Running:
                stats =
                    strings.Steps +
                    ': ' +
                    this.props.navigation.state.params.data.steps +
                    '\n' +
                    strings.Meters +
                    ': ' +
                    this.props.navigation.state.params.data.distance
                break
            case activity_types.Bicycling:
                stats =
                    strings.Meters +
                    ': ' +
                    this.props.navigation.state.params.data.distance
                break
            case activity_types.MedicineTest:
                stats =
                    strings.TakingMedicine +
                    ': ' +
                    this.props.navigation.state.params.data.pill
                break
            case activity_types.Orthostasis:
                stats = 'Orthostasis'
                break
            case activity_types.DeviceInstall:
                stats =
                    strings.DeviceId +
                    ': ' +
                    this.props.navigation.state.params.data.device_id
                break
            case activity_types.Alarm:
                stats =
                    strings.Alarm +
                    ' ' +
                    displayDateTime(
                        new Date(
                            this.props.navigation.state.params.time_started *
                                1000,
                        ),
                    )
                break
            default:
                break
        }
        this.setState({
            stats: stats,
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.stats}>{this.state.stats}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ActivityStatsScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20,
    },
    stats: {
        fontSize: 30,
        color: 'darkgrey',
        textAlign: 'center',
    },
})
