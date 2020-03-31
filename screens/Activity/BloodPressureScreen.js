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
    defaultStyles,
    activityTypes,
} from '../../constants'
import Activity from '../../classes/Activity'
import timestamp from '../../helpers/timestamp'
import { addHint, loadHints, saveDefaultHints } from '../../services/otherHints'
import SaveButton from '../../components/SaveButton'
import { defaultHints } from '../../constants/defaultHints'
import BloodPressure from '../../components/BloodPressure'
import { showError } from '../../services/toast'

class BloodPressureScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dateTime: new Date(),
            activity_type: null,
            bloodPressure: {
                before: ['', ''],
                after: ['', ''],
            },
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
            null,
            this.props.user.idinv,
            timestamp(),
            '',
            { bloodPressure: this.state.bloodPressure },
        )

        this.props.add(activity)
        this.props.navigation.navigate(paths.Home)
    }

    render() {
        return (
            <View style={defaultStyles.container}>
                <TimePicker
                    dateTime={this.state.dateTime}
                    handler={this.changeDateTime}
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

export default connect(mapStateToProps, mapDispatchToProps)(BloodPressureScreen)

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