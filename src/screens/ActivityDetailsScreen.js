import React, { Component } from 'react'
import { StyleSheet, View, Platform, Alert } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor, defaultHints } from '../constants'
import {
    activityTypes,
    paths,
    durations,
    pillsList,
    othersList,
    defaultStyles,
} from '../constants/'
import { displayDate, displayTime } from '../helpers/dateTime'
import { strings } from '../localization'
import { updateActivity, deleteActivity } from '../redux/actions'
import TimePicker from '../components/TimePicker'
import DurationPicker from '../components/DurationPicker'
import DeleteButton from '../components/DeleteButton'
import AudioRecorder from '../components/AudioRecorder'
import ActivitySelect from '../components/ActivitySelect'
import DropDownInput from '../components/DropDownInput'
import DropDownSelect from '../components/DropDownSelect'
import { activitySingleOverlap } from '../helpers/activityOverlap'
import Activity from '../classes/Activity'
import timestamp from '../helpers/timestamp'
import Comment from '../components/Comment'
import TakePhoto from '../components/TakePhoto'
import { loadHints } from '../services/hints'
import BloodPressure from '../components/BloodPressure'
import CaloriesInput from '../components/CaloriesInput'

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
                bloodPressure: false,
                trainer: false,
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

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.navigation.state.params) {
            if (nextProps.navigation.state.params.image) {
                return {
                    data: {
                        ...prevState.data,
                        photoFile: nextProps.navigation.state.params.image.uri,
                        image: null,
                    },
                }
            } else return null
        } else {
            return { photoFile: '' }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.data.image === null) {
            if (prevState.data.photoFile != this.state.data.photoFile) {
                // image updated
                let activity = { ...this.state.activity }
                let data = { ...this.state.data }

                activity.data = data

                this.setState(
                    {
                        activity: activity,
                        data: data,
                    },
                    () => this.update(),
                )
            }
        }
    }

    setSwitches = activity => {
        let pills = false
        let photo = false
        let duration = true
        let others = false
        let comment = true
        let bloodPressure = false
        let audio = true
        let trainer = false

        if (pillsList.includes(activity.activity_type)) {
            pills = true
            duration = false
            photo = true
            audio = false
            comment = false
        }

        if (othersList.includes(activity.activity_type)) {
            duration = true
            others = true
            comment = false
        }

        if (
            activity.activity_type === activityTypes.VerticalPositionCalibration
        ) {
            pills = false
            duration = false
            photo = false
            others = true
            comment = false
            audio = false
        }

        if (
            activity.activity_type === activityTypes.ActiveOrthostasis ||
            activity.activity_type === activityTypes.Press
        ) {
            bloodPressure = true
            comment = false
            audio = false
        }
        if (activity.activity_type === activityTypes.Trainer) {
            trainer = true
            comment = false
        }

        this.setState({
            switches: {
                activity: true,
                time: true,
                duration: duration,
                pills: pills,
                comment: comment,
                audio: audio,
                photo: photo,
                others: others,
                bloodPressure: bloodPressure,
                trainer: trainer,
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
        const originalActivity = new Activity({
            _id: this.state.originalActivity._id,
            activity_type: this.state.originalActivity.activity_type,
            time_started: this.state.originalActivity.time_started,
            time_ended: this.state.originalActivity.time_ended,
            utc_offset: this.state.originalActivity.utc_offset,
            task: this.state.originalActivity.task,
            idinv: this.state.originalActivity.idinv,
            last_updated: this.state.originalActivity.last_updated,
            comment: this.state.originalActivity.comment,
            data: this.state.originalActivity.data,
        })
        const activity = new Activity({
            _id: this.state.activity._id,
            activity_type: this.state.activity.activity_type,
            time_started: this.state.activity.time_started,
            time_ended: this.state.activity.time_ended,
            utc_offset: this.state.activity.utc_offset,
            task: this.state.activity.task,
            idinv: this.props.user.idinv,
            updated_at: timestamp(),
            comment: this.state.activity.comment,
            data: this.state.activity.data,
        })
        this.props.update(originalActivity, activity)
        this.setState({
            originalActivity: activity,
        })
    }

    deleteActivity = () => {
        this.props.remove(this.props.navigation.state.params)
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

        if (!pills.includes(activity.data.pill)) {
            pills = [activity.data.pill, ...pills]
        }

        this.setState({
            pills: pills,
        })
    }

    fillOthersList(activity) {
        if (!activity) activity = this.state.activity

        if (activity.activity_type === activityTypes.Trainer) {
            return this.fillTrainerList()
        }

        if (
            !othersList.includes(activity.activity_type) &&
            activity.activity_type !== activityTypes.VerticalPositionCalibration
        )
            return

        loadHints(activity.activity_type).then(res => {
            this.setState({ loadedOthers: res })
        })
    }

    fillTrainerList = () => {
        this.setState({ loadedOthers: defaultHints.Trainer })
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
        data.type = value
        activity.data = data
        this.setState(
            {
                activity: activity,
                data: data,
            },
            () => this.update(),
        )
    }

    onCaloriesChange = value => {
        let activity = { ...this.state.activity }
        let data = { ...this.state.data }
        data.calories = value
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

    changeBloodPressure = values => {
        let activity = { ...this.state.activity }
        let data = { ...this.state.data }
        data.bloodPressure = values
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
            <View style={defaultStyles.container}>
                {this.state.switches.activity && (
                    <View
                        style={
                            Platform.OS === 'ios'
                                ? { zIndex: 20, width: '100%' }
                                : { width: '100%' }
                        }>
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
                    <View
                        style={
                            Platform.OS === 'ios'
                                ? { zIndex: 10, width: '100%' }
                                : { width: '100%' }
                        }>
                        <DropDownInput
                            // style={{ zIndex: 10, width: '100%' }}
                            list={this.state.pills}
                            onChangeText={this.onPillChange}
                            value={this.state.activity.data.pill}
                            placeholder={strings.Drug}
                        />
                    </View>
                )}
                {this.state.switches.duration && (
                    <View
                        style={
                            Platform.OS === 'ios'
                                ? { zIndex: 10, width: '100%' }
                                : { width: '100%' }
                        }>
                        <DurationPicker
                            value={this.state.duration}
                            handler={this.onDurationChange}
                            addDuration={this.state.addDuration}
                        />
                    </View>
                )}
                {this.state.switches.others && (
                    <View
                        style={
                            Platform.OS === 'ios'
                                ? { zIndex: 10, width: '100%' }
                                : { width: '100%' }
                        }>
                        <DropDownInput
                            list={this.state.loadedOthers}
                            open={
                                this.state.activity.data.type === ''
                                    ? true
                                    : false
                            }
                            maxLines={4}
                            value={this.state.activity.data.type}
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
                {this.state.switches.photo &&
                    (this.state.activity.data.photoFile ? (
                        <TakePhoto
                            photo={this.state.data.photoFile}
                            openCamera={() =>
                                this.props.navigation.navigate(
                                    paths.JournalCamera,
                                    {
                                        returnTo: paths.ActivityDetails,
                                    },
                                )
                            }
                            removePhoto={this.removePhoto}
                        />
                    ) : (
                        <TakePhoto
                            link={this.state.data.image}
                            photo={this.state.data.photoFile}
                            openCamera={() =>
                                this.props.navigation.navigate(
                                    paths.JournalCamera,
                                    {
                                        returnTo: paths.ActivityDetails,
                                    },
                                )
                            }
                            removePhoto={this.removePhoto}
                        />
                    ))}
                {this.state.switches.trainer && (
                    <View
                        style={
                            Platform.OS === 'ios'
                                ? { zIndex: 10, width: '100%' }
                                : { width: '100%' }
                        }>
                        <DropDownSelect
                            list={this.state.loadedOthers}
                            open={true}
                            placeholder={strings.TrainerType}
                            value={this.state.activity.data.type}
                            onChangeText={this.onOthersChange}
                        />
                        <CaloriesInput
                            value={this.state.activity.data.calories}
                            onChangeText={this.onCaloriesChange}
                        />
                    </View>
                )}
                {this.state.switches.audio && (
                    <AudioRecorder
                        link={this.state.data.audio}
                        setAudio={this.setAudio}
                    />
                )}
                {this.state.switches.bloodPressure && (
                    <BloodPressure
                        callback={this.changeBloodPressure}
                        values={this.state.data.bloodPressure}
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
    buttonRemove: {
        margin: 20,
    },
})
