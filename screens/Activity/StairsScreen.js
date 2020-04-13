import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    BackHandler,
} from 'react-native'
import { secs2time, getUtcOffset } from '../../helpers/dateTime'
import BackgroundTimer from 'react-native-background-timer'
import { strings } from '../../localizations'
import { addActivity } from '../../redux/actions'
import { connect } from 'react-redux'
import { HeaderBackButton } from 'react-navigation'
// import { barometer } from 'react-native-sensors'
import { average, altMeter } from '../../helpers/math'
import { findLatestTask } from '../../classes/Task'
// import KeepAwake from 'react-native-keep-awake'
import { cancelNotification } from '../../redux/actions'
import {
    backgroundColor,
    paths,
    activityTypes,
    defaultStyles,
} from '../../constants'
import BackButton from '../../components/BackButton'
import Activity from '../../classes/Activity'
import timestamp from '../../helpers/timestamp'
import Barometer from '../../sensors/Barometer'
import Pedometer from '../../sensors/Pedometer'
import GPS from '../../sensors/GPS'
import SaveButton from '../../components/SaveButton'

let started = false

class StairsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.Stairs,
        headerLeft: (
            <BackButton
                goBack={() => {
                    if (started) {
                        Alert.alert(strings.Alert, strings.CantGoBack)
                    } else {
                        navigation.goBack()
                    }
                }}
            />
        ),
    })

    constructor(props) {
        super(props)

        this.state = {
            startDate: new Date(),
            meters: '0.0',
            metersMax: 0,
            button_text: strings.Start,
            started: false,
            tasks_id: null,
            mmHg: 0,
            steps: 0,
            distance: 0,
        }

        this.handleBackButton = this.handleBackButton.bind(this)
        this.update = this.update.bind(this)
        this.Pedometer = new Pedometer(this.setSteps)
        this.GPS = new GPS(this.setDistance)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButton,
        )
        started = false
    }

    handleBackButton() {
        if (this.state.started) {
            return true
        }
    }

    setDistance = distance => {
        this.setState({
            distance: distance,
        })
    }

    setSteps = pedometerData => {
        this.setState({
            steps: pedometerData.numberOfSteps,
        })
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)

        let tasks_id = findLatestTask(this.props.tasks, activityTypes.Stairs)
        if (
            this.props.navigation.state.params &&
            this.props.navigation.state.params.tasks_id
        ) {
            tasks_id = this.props.navigation.state.params.tasks_id
        }

        // zero it out
        this.setState({
            startDate: new Date(),
            meters: '0.0',
            tasks_id: tasks_id,
            steps: 0,
            distance: 0,
        })

        this.barometer = new Barometer()
        this.barometer.initialize(() => {
            this.setState({
                mmHg: this.barometer.mmHg,
            })
        })
    }

    record() {
        let tasks_id = this.state.tasks_id
            ? parseInt(this.state.tasks_id)
            : null
        if (tasks_id) cancelNotification(tasks_id)
        endDate = new Date()
        data = {
            meters: this.state.meters,
            metersMax: this.state.metersMax,
            steps: this.state.steps,
            distance: this.state.distance,
        }
        let positions = this.GPS.getFirstAndLastPosition()
        data = {
            ...data,
            ...positions,
        }
        let activity = new Activity(
            null,
            activityTypes.Stairs,
            timestamp(this.state.startDate),
            timestamp(),
            getUtcOffset(),
            tasks_id,
            this.props.idinv,
            timestamp(),
            '',
            data,
        )
        this.props.add(activity)
        this.props.navigation.navigate('ExerciseFinish', { activity: activity })
    }

    update() {
        if (!this.state.started) return

        let initialPressure = this.barometer.initialPressure
        let pressures = this.barometer.pressures

        let meters = altMeter(initialPressure, average(pressures)).toFixed(1)
        if (meters == -Infinity || meters == -0.0) meters = '0.0'

        if (isNaN(meters)) return

        this.setState(prevState => ({
            meters: meters,
            metersMax:
                prevState.metersMax < meters ? meters : prevState.metersMax,
            mmHg: (average(pressures).toFixed(1) / 1.3332236).toFixed(0),
        }))
    }

    updatesStop() {
        clearInterval(this.intervalId)
        this.barometer.stopUpdates()
        this.GPS.watchStop()
        this.Pedometer.stopUpdates()
        this.record()
    }

    startPressed() {
        started = true
        if (!this.intervalId) {
            this.setState({
                started: true,
                button_text: strings.Finish,
            })
            this.GPS.watchStart(10000)

            let dateTime = new Date()
            this.setState({ startDate: dateTime })
            this.Pedometer.startUpdates(dateTime)
            this.barometer.startUpdates()
            this.intervalId = setInterval(() => {
                this.update()
            }, 1000)
        } else {
            this.updatesStop()
        }
    }

    render() {
        return (
            <View style={defaultStyles.container}>
                <View style={styles.stats}>
                    <View style={styles.textSteps}>
                        <Text style={strings.Pressure}>
                            {strings.Pressure} ({strings.mmHg})
                        </Text>
                        <Text style={styles.number}>{this.state.mmHg}</Text>
                    </View>
                    <View style={styles.textDistance}>
                        <Text style={strings.Pressure}>{strings.Steps}</Text>
                        <Text style={styles.number}>{this.state.steps}</Text>
                    </View>
                </View>
                <View style={styles.timerView}>
                    <Text style={styles.timer}>{this.state.meters}</Text>
                </View>
                <View style={styles.button}>
                    <SaveButton
                        title={this.state.button_text}
                        onPress={() => {
                            this.startPressed()
                        }}
                    />
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        idinv: state.user.idinv,
        tasks: state.tasks,
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
)(StairsScreen)

const styles = StyleSheet.create({
    mainContent: {
        backgroundColor: 'green',
    },
    stats: {
        // height: 50,
        width: '100%',
        flexDirection: 'row',
        height: 50,
    },
    textSteps: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: '#dddddd',
    },
    textDistance: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderColor: '#dddddd',
    },
    text: {
        fontSize: 15,
        backgroundColor: 'black',
    },
    number: {
        fontSize: 25,
    },
    text: {
        padding: 10,
        flex: 3,
    },
    timerView: {
        top: '35%',
        height: 100,
        position: 'absolute',
    },
    timer: {
        fontSize: 80,
        fontWeight: '200',
        fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
    },
    button: {
        width: '100%',
        justifyContent: 'flex-end',
    },
})
