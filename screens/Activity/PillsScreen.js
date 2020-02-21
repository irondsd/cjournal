import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Button,
    Picker,
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
    activity_types,
} from '../../properties'
import DurationPicker from '../../components/DurationPicker'
import Activity from '../../classes/Activity'
import timestamp from '../../helpers/timestamp'
import PhotoButton from '../../components/PhotoButton'
import Photo from '../../components/Photo'
import DropDownInput from '../../components/DropDownInput'

submitted = false

class PillPickScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            photoFile: '',
            dateTime: new Date(),
            pill: '',
            pills: [],
            input: false,
            activity_type: null,
            tasks_id: null,
        }

        this.changeDateTime = this.changeDateTime.bind(this)
        this.onPillChange = this.onPillChange.bind(this)
        this.clearPhoto = this.clearPhoto.bind(this)
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${
            navigation.state.params.sender
                ? strings[navigation.state.params.sender]
                : strings['MedicineTest']
        }`,
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
            case activity_types.CourseTherapy:
                pills = this.props.user.course_therapy
                break
            case activity_types.ReliefOfAttack:
                pills = this.props.user.relief_of_attack
                break
            case activity_types.MedicineTest:
                pills = this.props.user.tests
                break
            default:
                pills = ['Error']
                break
        }
        this.setState({ pills: pills })
        if (this.props.navigation.state.params) {
            if (this.props.navigation.state.params.tasks_id) {
                for (let i = 0; i < this.props.tasks.length; i++) {
                    if (
                        this.props.tasks[i].id ==
                        this.props.navigation.state.params.tasks_id
                    ) {
                        let pill = this.props.tasks[i].data.pill
                        this.setState({
                            pill: pill,
                            activity_type: this.props.tasks[i].activity_type,
                            tasks_id: this.props.navigation.state.params
                                .tasks_id,
                        })
                    }
                }
            }
        }
    }

    changeDateTime(dateTime) {
        this.setState({
            dateTime: dateTime,
            pills: pills,
        })
    }

    handleSubmit() {
        if (submitted) return
        submitted = true

        let activity = new Activity(
            null,
            this.state.activity_type,
            timestamp(this.state.dateTime),
            null,
            this.state.tasks_id ? this.state.tasks_id : null,
            timestamp(),
            this.state.input,
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
    }

    render() {
        if (!this.state.activity_type) return null

        return (
            <View style={styles.container}>
                <TimePicker
                    dateTime={new Date()}
                    handler={this.changeDateTime}
                />
                <DropDownInput
                    placeholder={strings.Drug}
                    list={this.state.pills}
                    onChangeText={this.onPillChange}
                    open={true}
                />
                <View style={styles.center}>
                    <PhotoButton
                        callback={() =>
                            this.props.navigation.navigate('Camera', {
                                returnTo: paths.Pills,
                            })
                        }
                    />
                </View>

                <Photo
                    style={styles.photo}
                    photo={this.state.photoFile}
                    remove={this.clearPhoto}
                />

                <Button
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

export default connect(mapStateToProps, mapDispatchToProps)(PillPickScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
    },
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
