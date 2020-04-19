import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Picker,
    Alert,
} from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { displayDate, displayTime, getUtcOffset } from '../../helpers/dateTime'
import { strings } from '../../localizations'
import { addActivity } from '../../redux/actions'
import { connect } from 'react-redux'
import TimePicker from '../../components/TimePicker'
import {
    backgroundColor,
    durations,
    paths,
    defaultStyles,
    activityTypes,
    defaultDurations,
} from '../../constants'
import Activity from '../../classes/Activity'
import timestamp from '../../helpers/timestamp'
import { addHint, loadHints, saveDefaultHints } from '../../services/hints'
import SaveButton from '../../components/SaveButton'
import { defaultHints } from '../../constants/defaultHints'
import BloodPressure from '../../components/BloodPressure'
import { showError } from '../../services/toast'
import TimeSwitch from '../../components/TimeSwitch'
import DurationPicker from '../../components/DurationPicker'
import { findLatestTask } from '../../classes/Task'

class BloodPressureScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dateTime: new Date(),
            duration: 0,
            fromStart: strings.FromStart,
            options: [strings.FromStart, strings.FromEnd],
            activity_type: null,
            bloodPressure: {
                before: ['', ''],
                after: ['', ''],
            },
            list: [],
            defaultTime: true,
        }

        this.changeDateTime = this.changeDateTime.bind(this)
        this.onPickerChange = this.onPickerChange.bind(this)
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${strings[navigation.state.params.sender]}`,
    })

    componentDidMount() {
        let activity_type = this.props.navigation.state.params.sender
        let dateTime = new Date()
        dateTime.setMilliseconds(0)
        let tasks_id = null
        tasks_id = findLatestTask(this.props.tasks, activity_type)
        if (
            this.props.navigation.state.params &&
            this.props.navigation.state.params.tasks_id
        ) {
            tasks_id = this.props.navigation.state.params.tasks_id
        }
        dateTime.setSeconds(
            dateTime.getSeconds() - defaultDurations[activity_type].offset,
        )
        let duration = defaultDurations[activity_type].duration
        this.setState(
            {
                dateTime: dateTime,
                activity_type: activity_type,
                tasks_id: tasks_id,
                duration: duration / 60,
            },
            () => this.loadList(),
        )
    }

    loadList = () => {
        loadHints(this.state.activity_type).then(res => {
            // load defaults
            if (res.length === 0) {
                res = defaultHints[this.state.activity_type]
                saveDefaultHints(this.state.activity_type, res)
            }

            this.setState({ list: res })
        })
    }

    changeDateTime(dateTime) {
        this.setState({
            dateTime: dateTime,
        })
    }

    changeBloodPressure = values => {
        this.setState({
            bloodPressure: values,
        })
    }

    handleSubmit() {
        if (
            this.state.bloodPressure.before[0] === '' ||
            this.state.bloodPressure.before[1] === '' ||
            this.state.bloodPressure.after[0] === '' ||
            this.state.bloodPressure.after[1] === ''
        )
            return showError('Not filled up')

        let activity = new Activity(
            null,
            this.state.activity_type,
            timestamp(this.state.dateTime),
            null,
            getUtcOffset(),
            null,
            this.props.user.idinv,
            timestamp(),
            '',
            { bloodPressure: this.state.bloodPressure },
        )

        if (this.state.defaultTime) activity.data.default_time = true

        this.props.add(activity)
        this.props.navigation.navigate(paths.Home)
    }

    onPickerChange = itemValue => {
        let dateTime = this.state.dateTime
        if (this.state.fromStart == strings.FromEnd) {
            dateTime.setMinutes(dateTime.getMinutes() - itemValue)
        }

        this.setState({
            duration: itemValue,
            dateTime: dateTime,
        })
    }

    setSelectedOption = selectedOption => {
        if (this.state.fromStart == selectedOption) {
            return
        }

        let newDate = this.state.dateTime
        if (selectedOption == strings.FromStart) {
            newDate.setMinutes(newDate.getMinutes() + this.state.duration)
        } else {
            newDate.setMinutes(newDate.getMinutes() - this.state.duration)
        }
        this.setState({
            fromStart: selectedOption,
            dateTime: newDate,
        })
        this.changeDateTime(newDate)
        this.forceUpdate()
    }

    render() {
        return (
            <View style={defaultStyles.container}>
                <TimeSwitch
                    onSelection={this.setSelectedOption.bind(this)}
                    value={this.state.fromStart}
                />
                <TimePicker
                    dateTime={this.state.dateTime}
                    handler={this.changeDateTime}
                />
                <DurationPicker
                    duration={this.state.duration}
                    handler={this.onPickerChange}
                    value={this.state.duration}
                />
                <BloodPressure
                    callback={this.changeBloodPressure}
                    values={this.state.bloodPressure}
                />
                <View style={{ zIndex: 1, width: '100%' }}>
                    <SaveButton
                        style={styles.button}
                        title={strings.Save}
                        onPress={() => {
                            this.handleSubmit.bind(this)
                            this.handleSubmit()
                        }}
                    />
                </View>
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
    add: activity => {
        dispatch(addActivity(activity))
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BloodPressureScreen)

const styles = StyleSheet.create({
    input: {
        fontSize: 20,
        backgroundColor: 'whitesmoke',
        color: 'black',
        margin: 20,
        padding: 10,
    },
    time: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    timeText: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        marginTop: 40,
    },
    button: {
        flex: 2,
        margin: 20,
        justifyContent: 'flex-end',
    },
    picker: {
        left: 80,
        height: 50,
        alignItems: 'center',
        width: '60%',
    },
})
