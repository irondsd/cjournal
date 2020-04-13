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
} from '../../constants'
import { activitySingleOverlap } from '../../helpers/activityOverlap'
import DurationPicker from '../../components/DurationPicker'
import AudioRecorder from '../../components/AudioRecorder'
import Activity from '../../classes/Activity'
import timestamp from '../../helpers/timestamp'
import Comment from '../../components/Comment'
import TimeSwitch from '../../components/TimeSwitch'
import SaveButton from '../../components/SaveButton'

// TODO: default durations

class TimePickScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            comment: '',
            dateTime: new Date(),
            duration: 0,
            fromStart: strings.FromStart,
            options: [strings.FromStart, strings.FromEnd],
            audioFile: null,
        }

        this.changeDateTime = this.changeDateTime.bind(this)
        this.onPickerChange = this.onPickerChange.bind(this)
        this.setAudio = this.setAudio.bind(this)
        this.setSelectedOption = this.setSelectedOption.bind(this)
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${strings[navigation.state.params.sender]}`,
    })

    componentDidMount() {
        let dateTime = new Date()
        dateTime.setMilliseconds(0)
        this.setState({
            dateTime: dateTime,
        })
    }

    changeDateTime(dateTime) {
        this.setState({
            dateTime: dateTime,
        })
    }

    handleSubmit() {
        let timeEnded = new Date(this.state.dateTime)
        timeEnded.setSeconds(this.state.dateTime.getSeconds())
        timeEnded.setMilliseconds(0)
        timeEnded.setMinutes(
            timeEnded.getMinutes() + parseInt(this.state.duration),
        )
        if (this.state.duration == 0) timeEnded = null
        let activity = new Activity(
            null,
            this.props.navigation.state.params.sender,
            timestamp(this.state.dateTime),
            timeEnded ? timestamp(timeEnded) : null,
            getUtcOffset(),
            null,
            this.props.user.idinv,
            timestamp(),
            this.state.comment,
            {},
        )
        if (this.state.audioFile) activity.data.audioFile = this.state.audioFile

        let overlaps = activitySingleOverlap(this.props.activity, activity)
        if (overlaps) {
            Alert.alert(strings.OverlapTitle, strings.OverlapMsg)
        } else {
            this.props.add(activity)
            this.props.navigation.navigate(paths.Home)
        }
    }

    onCommentChange = value => {
        this.setState({
            comment: value,
        })
    }

    onPickerChange(itemValue) {
        let dateTime = this.state.dateTime
        if (this.state.fromStart === strings.FromEnd) {
            dateTime.setMinutes(dateTime.getMinutes() - itemValue)
        }

        this.setState({
            duration: itemValue,
            dateTime: dateTime,
        })
    }

    setSelectedOption(selectedOption) {
        if (this.state.fromStart === selectedOption) {
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

    setAudio(audioFile) {
        this.setState({
            audioFile: audioFile,
        })
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
                <View style={Platform.OS === 'ios' ? { zIndex: 10 } : null}>
                    <DurationPicker
                        duration={this.state.duration}
                        handler={this.onPickerChange}
                        value={this.state.duration}
                    />
                </View>
                <Comment
                    comment={this.state.comment}
                    onChangeText={this.onCommentChange}
                />
                <AudioRecorder
                    audioFile={this.state.audioFile}
                    setAudio={this.setAudio}
                />
                <View style={{ zIndex: 5, width: '100%' }}>
                    <SaveButton
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
)(TimePickScreen)

const styles = StyleSheet.create({
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
