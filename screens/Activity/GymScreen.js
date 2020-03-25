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
import { displayDate, displayTime } from '../../helpers/dateTime'
import { strings } from '../../localizations'
import { addActivity } from '../../redux/actions'
import { connect } from 'react-redux'
import TimePicker from '../../components/TimePicker'
import {
    backgroundColor,
    durations,
    paths,
    activityTypes,
} from '../../constants'
import DurationPicker from '../../components/DurationPicker'
import AudioRecorder from '../../components/AudioRecorder'
import Activity from '../../classes/Activity'
import timestamp from '../../helpers/timestamp'
import DropDownSelect from '../../components/DropDownSelect'
import TimeSwitch from '../../components/TimeSwitch'
import { addHint, loadHints } from '../../services/otherHints'
import CaloriesInput from '../../components/CaloriesInput'
import { activitySingleOverlap } from '../../helpers/activityOverlap'
import SaveButton from '../../components/SaveButton'

let clicked = false
class GymScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dateTime: new Date(),
            duration: 0,
            fromStart: strings.FromEnd,
            options: [strings.FromStart, strings.FromEnd],
            audioFile: null,
            activity_type: null,
            type: '',
            list: [
                'Walking',
                'Running',
                'Cycling',
                'Elliptical',
                'Stair-stepper',
            ],
            calories: '',
        }

        this.changeDateTime = this.changeDateTime.bind(this)
        this.onPickerChange = this.onPickerChange.bind(this)
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${strings[activityTypes.Gym]}`,
    })

    componentDidMount() {
        let dateTime = new Date()
        dateTime.setMilliseconds(0)
        this.setState({
            dateTime: dateTime,
            activity_type: activityTypes.Gym,
        })
    }

    changeDateTime(dateTime) {
        this.setState({
            dateTime: dateTime,
        })
    }

    handleSubmit() {
        if (!clicked) {
            setTimeout(() => {
                clicked = false
            }, 1000)
            let timeEnded = new Date(this.state.dateTime)
            timeEnded.setSeconds(this.state.dateTime.getSeconds())
            timeEnded.setMilliseconds(0)
            timeEnded.setMinutes(
                timeEnded.getMinutes() + parseInt(this.state.duration),
            )

            if (this.state.duration == 0) timeEnded = null
            let activity = new Activity(
                null,
                this.state.activity_type,
                timestamp(this.state.dateTime),
                timeEnded ? timestamp(timeEnded) : null,
                null,
                this.props.user.idinv, // TODO: check
                timestamp(),
                '',
                { calories: this.state.calories, type: this.state.type },
            )
            if (this.state.audioFile)
                activity.data.audioFile = this.state.audioFile

            let overlaps = activitySingleOverlap(this.props.activity, activity)
            if (overlaps) {
                Alert.alert(strings.OverlapTitle, strings.OverlapMsg)
            } else {
                this.props.add(activity)
                this.props.navigation.navigate(paths.Home)
            }
        }
    }

    onPickerChange(itemValue) {
        let dateTime = this.state.dateTime
        if (this.state.fromStart == strings.FromEnd) {
            dateTime.setMinutes(dateTime.getMinutes() - itemValue)
        }

        this.setState({
            duration: itemValue,
            dateTime: dateTime,
        })
    }

    setSelectedOption(selectedOption) {
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

    setAudio(audioFile) {
        this.setState({
            audioFile: audioFile,
        })
    }

    render() {
        return (
            <View style={styles.container}>
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
                />
                <DropDownSelect
                    list={this.state.list}
                    open={true}
                    // maxLines={5}
                    value={this.state.type}
                    placeholder={strings.GymType}
                    onSelect={value => {
                        this.setState({
                            type: value,
                        })
                    }}
                />
                <CaloriesInput
                    value={this.state.calories}
                    onChangeText={value => this.setState({ calories: value })}
                />
                <View style={{ zIndex: 1 }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(GymScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
    },
})
