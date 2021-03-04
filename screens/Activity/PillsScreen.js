import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Picker } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { displayDate, displayTime, getUtcOffset } from '../../helpers/dateTime'
import { strings } from '../../localization'
import { addActivity } from '../../redux/actions'
import { connect } from 'react-redux'
import TimePicker from '../../components/TimePicker'
import {
    backgroundColor,
    durations,
    paths,
    activityTypes,
    defaultStyles,
} from '../../constants'
import DurationPicker from '../../components/DurationPicker'
import Activity from '../../classes/Activity'
import { findTaskById, findLatestTask } from '../../classes/Task'
import TakePhoto from '../../components/TakePhoto'
import DropDownInput from '../../components/DropDownInput'
import SaveButton from '../../components/SaveButton'
import timestamp from '../../helpers/timestamp'

class PillsScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            photoFile: '',
            dateTime: new Date(),
            pill: '',
            pills: [],
            input: false,
            activity_type: null,
            task: null,
        }

        this.changeDateTime = this.changeDateTime.bind(this)
        this.onPillChange = this.onPillChange.bind(this)
        this.clearPhoto = this.clearPhoto.bind(this)
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${strings[navigation.state.params.sender]}`,
    })

    componentDidMount() {
        let dateTime = new Date()
        dateTime.setSeconds(0)
        dateTime.setMilliseconds(0)
        let activity_type = this.props.navigation.state.params.sender
        this.setState({
            dateTime: dateTime,
            activity_type: activity_type,
        })

        let pills
        switch (activity_type) {
            case activityTypes.CourseTherapy:
                pills = this.props.user.course_therapy
                break
            case activityTypes.ReliefOfAttack:
                pills = this.props.user.relief_of_attack
                break
            case activityTypes.MedicineTest:
                pills = this.props.user.tests
                break
            default:
                pills = ['Error']
                break
        }
        this.setState({ pills: pills })

        let task_id = findLatestTask(this.props.tasks, activity_type)
        let pill = null
        let task = null

        if (this.props.navigation.state.params?.task) {
            task_id = this.props.navigation.state.params.task
        }

        task = findTaskById(this.props.tasks, task_id)
        if (task) {
            pill = task.data.pill
        }

        this.setState({
            pill: pill,
            task: task_id,
        })
    }

    changeDateTime(dateTime) {
        this.setState({
            dateTime: dateTime,
        })
    }

    handleSubmit() {
        let activity = Activity.init(
            this.state.activity_type,
            timestamp(this.state.dateTime),
            null,
            this.state.task_id ? this.state.task_id : null,
            this.props.user.idinv,
            '',
            { pill: this.state.pill },
        )
        if (this.state.photoFile) activity.data.photoFile = this.state.photoFile
        this.props.add(activity)
        this.props.navigation.navigate(paths.Home)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.navigation.state.params) {
            if (nextProps.navigation.state.params.image) {
                return {
                    photoFile: nextProps.navigation.state.params.image.uri,
                }
            }
        } else {
            return { photoFile: '' }
        }
    }

    onPillChange(itemValue) {
        this.setState({
            pill: itemValue,
        })
    }

    clearPhoto() {
        this.setState({
            photoFile: null,
        })
        this.props.navigation.setParams({ image: null })
    }

    render() {
        if (!this.state.activity_type) return null
        return (
            <View style={defaultStyles.container}>
                <TimePicker
                    dateTime={this.state.dateTime}
                    handler={this.changeDateTime}
                />
                <View
                    style={
                        Platform.OS === 'ios'
                            ? { zIndex: 10, width: '100%' }
                            : { width: '100%' }
                    }>
                    <DropDownInput
                        placeholder={strings.Drug}
                        list={this.state.pills}
                        onChangeText={this.onPillChange}
                        open={true}
                        value={this.state.pill}
                    />
                </View>
                <TakePhoto
                    photo={this.state.photoFile}
                    openCamera={() =>
                        this.props.navigation.navigate(paths.Camera, {
                            returnTo: paths.Pills,
                        })
                    }
                    removePhoto={this.clearPhoto}
                />
                <SaveButton
                    style={styles.button}
                    title={strings.Save}
                    onPress={() => {
                        this.handleSubmit.bind(this)
                        this.handleSubmit()
                    }}
                />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        tasks: state.tasks,
    }
}

const mapDispatchToProps = dispatch => ({
    add: activity => {
        dispatch(addActivity(activity))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(PillsScreen)

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
    },
    photo: {
        height: 200,
    },

    button: {
        zIndex: 1,
        flex: 2,
        margin: 20,
        justifyContent: 'flex-end',
    },
})
