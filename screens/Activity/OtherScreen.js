import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    Picker,
    Alert,
} from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { displayDate, displayTime } from '../../helpers/dateTime'
import { strings } from '../../localizations'
import { addActivity } from '../../redux/actions'
import { connect } from 'react-redux'
import TimePicker from '../../components/TimePicker'
import { backgroundColor, durations, paths } from '../../properties'
import DurationPicker from '../../components/DurationPicker'
import { overlappingGreying } from '../../helpers/activityOverlap'
import AudioRecorder from '../../components/AudioRecorder'
import Activity from '../../classes/Activity'
import timestamp from '../../helpers/timestamp'
import DropDownInput from '../../components/DropDownInput'
import TimeSwitch from '../../components/TimeSwitch'
import { addHint, loadHints } from '../../services/otherHints'

let clicked = false
class OtherScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            other: 'what',
            dateTime: new Date(),
            duration: 0,
            fromStart: strings.FromStart,
            options: [strings.FromStart, strings.FromEnd],
            audioFile: null,
            activity_type: null,
            list: [],
        }

        this.changeDateTime = this.changeDateTime.bind(this)
        this.onPickerChange = this.onPickerChange.bind(this)
        this.setAudio = this.setAudio.bind(this)
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${strings[navigation.state.params.sender]}`,
    })

    componentDidMount() {
        dateTime = new Date()
        dateTime.setMilliseconds(0)
        this.setState(
            {
                dateTime: dateTime,
                activity_type: this.props.navigation.state.params.sender,
            },
            () => this.loadList(),
        )
    }

    loadList = () => {
        loadHints(this.state.activity_type).then(res => {
            console.log(res)
            this.setState({ list: res })
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

            addHint(this.state.activity_type, this.state.other)

            if (this.state.duration == 0) timeEnded = null
            let activity = new Activity(
                null,
                this.state.activity_type,
                timestamp(this.state.dateTime),
                timeEnded ? timestamp(timeEnded) : null,
                null,
                timestamp(),
                '',
                { other: this.state.other },
            )
            if (this.state.audioFile)
                activity.data.audioFile = this.state.audioFile

            let overlaps = overlappingGreying(this.props.activity, activity)
            if (!overlaps) {
                this.props.add(activity)
                this.props.navigation.navigate(paths.Home)
            } else {
                Alert.alert(strings.OverlapTitle, strings.OverlapMsg)
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
                <DropDownInput
                    list={this.state.list}
                    open={true}
                    onChangeText={text => {
                        this.setState({
                            other: text,
                        })
                    }}
                />
                <AudioRecorder
                    audioFile={this.state.audioFile}
                    setAudio={this.setAudio}
                />
                <View style={{ zIndex: 1 }}>
                    <Button
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

export default connect(mapStateToProps, mapDispatchToProps)(OtherScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
    },
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
