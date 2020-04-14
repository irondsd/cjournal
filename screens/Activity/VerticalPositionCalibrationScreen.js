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
} from '../../constants'
import DurationPicker from '../../components/DurationPicker'
import AudioRecorder from '../../components/AudioRecorder'
import Activity from '../../classes/Activity'
import timestamp from '../../helpers/timestamp'
import DropDownInput from '../../components/DropDownInput'
import TimeSwitch from '../../components/TimeSwitch'
import { addHint, loadHints, saveDefaultHints } from '../../services/hints'
import { activitySingleOverlap } from '../../helpers/activityOverlap'
import SaveButton from '../../components/SaveButton'
import { defaultHints } from '../../constants/defaultHints'

let clicked = false
class VerticalPositionCalibrationScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            type: '',
            dateTime: new Date(),
            activity_type: null,
            list: [],
        }

        this.changeDateTime = this.changeDateTime.bind(this)
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${strings[navigation.state.params.sender]}`,
    })

    componentDidMount() {
        let dateTime = new Date()
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

            addHint(this.state.activity_type, this.state.type)

            if (this.state.duration == 0) timeEnded = null
            let activity = new Activity(
                null,
                this.state.activity_type,
                timestamp(this.state.dateTime),
                timeEnded ? timestamp(timeEnded) : null,
                getUtcOffset(),
                null,
                this.props.user.idinv,
                timestamp(),
                '',
                { type: this.state.type },
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

    render() {
        return (
            <View style={defaultStyles.container}>
                <TimePicker
                    dateTime={this.state.dateTime}
                    handler={this.changeDateTime}
                />
                <DropDownInput
                    list={this.state.list}
                    open={true}
                    onChangeText={text => {
                        this.setState({
                            type: text,
                        })
                    }}
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
)(VerticalPositionCalibrationScreen)

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
