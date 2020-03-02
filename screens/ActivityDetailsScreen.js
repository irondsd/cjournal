import React, { Component } from 'react'
import { StyleSheet, View, Button, Platform, Alert } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../constants'
import {
    activityTypes,
    editable,
    paths,
    durations,
    pillsList,
    othersList,
} from '../constants/'
import { displayDate, displayTime } from '../helpers/dateTime'
import { strings } from '../localizations'
import { updateActivity, deleteActivity } from '../redux/actions'
import TimePicker from '../components/TimePicker'
import DurationPicker from '../components/DurationPicker'
import DeleteButton from '../components/DeleteButton'
import AudioRecorder from '../components/AudioRecorder'
import ActivitySelect from '../components/ActivitySelect'
import DropDownInput from '../components/DropDownInput'
import { activitySingleOverlap } from '../helpers/activityOverlap'
import Activity from '../classes/Activity'
import timestamp from '../helpers/timestamp'
import Photo from '../components/Photo'
import Comment from '../components/Comment'
import TakePhoto from '../components/TakePhoto'
import { loadHints } from '../services/otherHints'

class ActivityDetailsScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activity: {
                activity_type: '',
            },
            activity_type: '',
            comment: '',
            data: { audioFile: '', photoFile: null },
            stats: '',
            duration: 0,
            dateTime: null,
            disabled: false,
            pills: [],
            switches: {
                activity: true,
                time: true,
                duration: true,
                pills: false,
                comment: true,
                audio: true,
                photo: false,
                others: false,
            },
            loadedOthers: [],
        }
        this.onDurationChange = this.onDurationChange.bind(this)
        this.changeDateTime = this.changeDateTime.bind(this)
        this.onPillChange = this.onPillChange.bind(this)
        this.setAudio = this.setAudio.bind(this)
        this.deleteActivity = this.deleteActivity.bind(this)
    }

    static navigationOptions = ({ navigation }) => ({
        title: strings.ActivityEdit,
        headerRight: (
            <DeleteButton callback={navigation.state.params.deleteActivity} />
        ),
    })

    componentDidMount() {
        let data = this.props.navigation.state.params.data
        this.props.navigation.setParams({ deleteActivity: this.deleteActivity })

        let duration = 0
        if (this.props.navigation.state.params.time_ended) {
            duration = Math.round(
                (this.props.navigation.state.params.time_ended -
                    this.props.navigation.state.params.time_started) /
                    60,
            )
        }

        let addDuration
        if (!durations.includes(duration)) {
            addDuration = duration
        }

        this.fillPillsList(this.props.navigation.state.params)
        this.fillOthersList(this.props.navigation.state.params)
        this.setSwitches(this.props.navigation.state.params)

        this.setState({
            activity: this.props.navigation.state.params,
            dateTime: this.props.navigation.state.params.time_started,
            originalActivity: this.props.navigation.state.params,
            activity_type: this.props.navigation.state.params.activity_type,
            data: data,
            comment: this.props.navigation.state.params.comment,
            duration: duration,
            addDuration: addDuration,
        })
    }

    setSwitches = activity => {
        let pills = false
        let photo = false
        let duration = true
        let others = false
        let comment = true

        if (pillsList.includes(activity.activity_type)) {
            pills = true
            duration = false
            photo = true
            others = false
            comment = true
        }

        if (othersList.includes(activity.activity_type)) {
            pills = false
            duration = false
            photo = false
            others = true
            comment = false
        }

        this.setState({
            switches: {
                activity: true,
                time: true,
                duration: duration,
                pills: pills,
                comment: comment,
                audio: true,
                photo: photo,
                others: others,
            },
        })
    }

    changeDateTime(dateTime) {
        activity = { ...this.state.activity }
        activity.time_started = (dateTime.getTime() + '').substring(0, 10)
        activity.time_ended =
            parseInt(activity.time_started) + this.state.duration * 60
        this.setState(
            {
                dateTime: dateTime,
                activity: activity,
            },
            () => {
                let overlaps = activitySingleOverlap(
                    this.props.activity,
                    this.state.activity,
                )

                if (!overlaps) {
                    this.update()
                } else {
                    // resetting time
                    activity = { ...this.state.activity }
                    activity.time_started = this.state.originalActivity.time_started
                    activity.time_ended =
                        parseInt(activity.time_started) +
                        this.state.duration * 60
                    this.setState({
                        dateTime: this.state.originalActivity.time_started,
                        activity: activity,
                    })
                    Alert.alert(strings.OverlapTitle, strings.OverlapMsg)
                }
            },
        )
    }

    update() {
        let originalActivity = new Activity(
            this.state.originalActivity.id,
            this.state.originalActivity.activity_type,
            this.state.originalActivity.time_started,
            this.state.originalActivity.time_ended,
            this.state.originalActivity.tasks_id,
            this.state.originalActivity.last_updated,
            this.state.originalActivity.comment,
            this.state.originalActivity.data,
        )
        let activity = new Activity(
            this.state.activity.id,
            this.state.activity.activity_type,
            this.state.activity.time_started,
            this.state.activity.time_ended,
            this.state.activity.tasks_id,
            timestamp(),
            this.state.activity.comment,
            this.state.activity.data,
        )
        this.props.update(originalActivity, activity)
        this.setState({
            originalActivity: activity,
        })
    }

    deleteActivity = () => {
        this.props.remove(this.state.originalActivity)
        this.props.navigation.navigate(paths.Jounal)
    }

    goBack() {
        this.props.navigation.goBack()
    }

    onPickerChange = value => {
        let activity = { ...this.state.activity }
        activity.activity_type = value
        this.setState(
            {
                activity_type: value,
                activity: activity,
            },
            () => {
                this.fillPillsList(this.state.activity)
                this.fillOthersList(this.state.activity)
                this.update()
            },
        )
    }

    onDurationChange(itemValue) {
        let time_started = parseInt(this.state.activity.time_started)
        let time_ended = time_started + itemValue * 60

        let activity = { ...this.state.activity }
        activity.time_ended = time_ended

        this.setState(
            {
                activity: activity,
                duration: itemValue,
            },
            () => {
                this.update()
            },
        )
    }

    onInputChange(text) {
        let activity = { ...this.state.activity }
        activity.comment = text
        this.setState(
            {
                activity: activity,
                comment: text,
            },
            () => {
                // this.update()
            },
        )
    }

    onEndEditing(text) {
        this.update()
    }

    fillPillsList(activity) {
        let pills = []

        if (!activity) activity = this.state.activity
        if (activity.activity_type === activityTypes.CourseTherapy)
            pills = this.props.user.course_therapy
        if (activity.activity_type === activityTypes.ReliefOfAttack)
            pills = this.props.user.relief_of_attack
        if (activity.activity_type === activityTypes.MedicineTest)
            pills = this.props.user.tests
        if (pills.length == 0) {
            pills = [strings.NotFilled]
        }

        if (!pills.includes(activity.data.pill)) {
            pills = [activity.data.pill, ...pills]
        }

        this.setState({
            pills: pills,
        })
    }

    fillOthersList(activity) {
        let list = []

        if (!activity) activity = this.state.activity
        if (!othersList.includes(activity.activity_type)) return

        loadHints(activity.activity_type).then(res => {
            this.setState({ loadedOthers: res })
        })
    }

    onPillChange(itemValue) {
        let activity = { ...this.state.activity }
        let data = { ...this.state.data }
        data.pill = itemValue
        activity.data = data
        this.setState(
            {
                activity: activity,
                data: data,
            },
            () => this.update(),
        )
    }

    onOthersChange = value => {
        let activity = { ...this.state.activity }
        let data = { ...this.state.data }
        data.other = value
        activity.data = data
        this.setState(
            {
                activity: activity,
                data: data,
            },
            () => this.update(),
        )
    }

    setAudio(audioFile) {
        let activity = { ...this.state.activity }
        let data = { ...this.state.data }
        data.audioFile = audioFile
        activity.data = data
        this.setState(
            {
                activity: activity,
                data: data,
            },
            () => this.update(),
        )
    }

    removePhoto = () => {
        let activity = { ...this.state.activity }
        let data = { ...this.state.data }
        delete data.image
        delete data.photoFile
        activity.data = data
        this.setState(
            {
                activity: activity,
                data: data,
            },
            () => this.update(),
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.switches.activity && (
                    <View style={Platform.OS === 'ios' ? { zIndex: 10 } : null}>
                        <ActivitySelect
                            onSelect={this.onPickerChange}
                            value={this.state.activity_type}
                        />
                    </View>
                )}
                {this.state.switches.time && (
                    <TimePicker
                        dateTime={
                            new Date(this.state.activity.time_started * 1000)
                        }
                        handler={this.changeDateTime}
                        disabled={this.state.disabled}
                    />
                )}
                {this.state.switches.pills && (
                    <View style={Platform.OS === 'ios' ? { zIndex: 10 } : null}>
                        <DropDownInput
                            style={
                                Platform.OS === 'ios' ? { zIndex: 10 } : null
                            }
                            list={this.state.pills}
                            onChangeText={this.onPillChange}
                            value={this.state.activity.data.pill}
                            placeholder={strings.Drug}
                        />
                    </View>
                )}
                {this.state.switches.duration && (
                    <View style={Platform.OS === 'ios' ? { zIndex: 10 } : null}>
                        <DurationPicker
                            value={this.state.duration}
                            handler={this.onDurationChange}
                            addDuration={this.state.addDuration}
                        />
                    </View>
                )}
                {this.state.switches.others && (
                    <View style={Platform.OS === 'ios' ? { zIndex: 10 } : null}>
                        <DropDownInput
                            list={this.state.loadedOthers}
                            open={true}
                            maxLines={4}
                            value={this.state.activity.data.other}
                            onChangeText={this.onOthersChange}
                        />
                    </View>
                )}
                {this.state.switches.comment && (
                    <Comment
                        comment={this.state.comment}
                        onChangeText={text => {
                            this.onInputChange(text)
                        }}
                        onEndEditing={text => {
                            this.onEndEditing(text)
                        }}
                    />
                )}
                {this.state.switches.photo && (
                    // <Photo
                    //     link={this.state.data.image}
                    //     remove={this.removePhoto}
                    // />
                    <TakePhoto
                        link={this.state.data.image}
                        openCamera={() =>
                            this.props.navigation.navigate('Camera', {
                                returnTo: paths.Pills,
                            })
                        }
                        removePhoto={this.removePhoto}
                    />
                )}
                {this.state.switches.audio && (
                    <AudioRecorder
                        link={this.state.data.audio}
                        setAudio={this.setAudio}
                    />
                )}
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
    update: (originalActivity, updatedActivity) => {
        dispatch(updateActivity(originalActivity, updatedActivity))
    },
    remove: activity => {
        dispatch(deleteActivity(activity))
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ActivityDetailsScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
        zIndex: 1,
    },
    stats: {
        color: 'grey',
        textAlign: 'center',
    },
    buttonRemove: {
        margin: 20,
    },
})
