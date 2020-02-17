import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    BackHandler,
    Vibration,
} from 'react-native'
import { secs2time } from '../../helpers/dateTime'
import BackgroundTimer from 'react-native-background-timer'
import { strings } from '../../localizations'
import { addActivity } from '../../redux/actions'
import { connect } from 'react-redux'
import { HeaderBackButton } from 'react-navigation'
import { calculateDistance } from '../../helpers/GPS'
import { backgroundColor, activity_types, paths } from '../../properties'
import BackButton from '../../components/BackButton'
import { showError } from '../../services/toast'
import Activity from '../../classes/Activity'
import timestamp from '../../helpers/timestamp'
import requestLocationPermissions from '../../permissions/requestLocationPermissions'
import GPS from '../../sensors/GPS'
import Pedometer from '../../sensors/Pedometer'

let timerOn = false

class RunningScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.Running,
        headerLeft: (
            <BackButton
                goBack={() => {
                    if (timerOn) {
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

        this.handleBackButton = this.handleBackButton.bind(this)
        this.setDistance = this.setDistance.bind(this)
        this.setSteps = this.setSteps.bind(this)

        this.state = {
            timer: '0:00',
            time_seconds: 0,
            timer_set: false,
            button_text: strings.Start,
            intervalId: 0,
            timeoutId: 0,
            startDate: new Date(),
            numberOfSteps: 0,
            tasks_id: null,
            distance: 0,
            speed: 0,
            positions: [],
        }

        this.GPS = new GPS(this.setDistance)
        this.Pedometer = new Pedometer(this.setSteps)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButton,
        )
        this.Pedometer.stopUpdates()
        this.GPS.watchStop()
    }

    handleBackButton() {
        if (this.state.timer_set) {
            return true
        }
    }

    componentDidMount() {
        requestLocationPermissions()
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
        this.setState({
            timer: secs2time(this.state.time_seconds),
            tasks_id: this.props.navigation.state.params
                ? this.props.navigation.state.params.tasks_id
                : null,
        })

        if (this.props.navigation.state.params)
            cancelNotification(this.props.navigation.state.params.tasks_id)
    }

    record() {
        tasks_id = this.state.tasks_id ? parseInt(this.state.tasks_id) : null
        if (tasks_id) cancelNotification(tasks_id)
        endDate = new Date()
        data = {
            steps: this.state.numberOfSteps ? this.state.numberOfSteps : 0,
            distance: this.state.distance ? this.state.distance : 0,
        }

        let positions = this.GPS.getFirstAndLastPosition()
        data = {
            ...data,
            ...positions,
        }

        let activity = new Activity(
            null,
            activity_types.GymWalking,
            timestamp(this.state.startDate),
            timestamp(),
            tasks_id,
            timestamp(),
            '',
            data,
        )
        this.props.add(activity)
        this.props.navigation.navigate(paths.ExerciseFinish, {
            activity: activity,
        })
    }

    setDistance(distance) {
        this.setState({
            distance: distance,
        })
    }

    setSteps(pedometerData) {
        this.setState({
            numberOfSteps: pedometerData.numberOfSteps,
        })
    }

    componentWillUnmount() {
        this.timerStop()
    }

    timerStart() {
        timerOn = true
        console.log('timer started')
        // this timer is to update the screen
        const intervalId = BackgroundTimer.setInterval(() => {
            this.timerTick()
        }, 1000)

        this.setState(prevstate => ({
            intervalId: intervalId,
        }))

        this.GPS.watchStart(10000)

        let dateTime = new Date()
        this.setState({ startDate: dateTime })
        this.Pedometer.startUpdates(dateTime)
    }

    startPressed() {
        if (!this.state.timer_set) {
            this.setState({
                timer_set: true,
                button_text: strings.Terminate,
            })
            this.timerStart()
        } else {
            Alert.alert(strings.Cancel, strings.TerminationExerciseQuestion, [
                {
                    text: strings.Cancel,
                    style: 'cancel',
                },
                {
                    text: strings.Terminate,
                    onPress: () => {
                        this.timerStop()
                        this.record()
                    },
                },
            ])
        }
    }

    timerTick() {
        console.log('tick')

        this.setState(prevState => ({
            timer_set: true,
            time_seconds: prevState.time_seconds + 1,
            timer: secs2time(prevState.time_seconds + 1),
        }))
    }

    timerStop() {
        BackgroundTimer.clearInterval(this.state.intervalId)
        this.GPS.watchStop()
        this.Pedometer.stopUpdates()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {strings.Steps}: {this.state.numberOfSteps},{' '}
                    {strings.Distance}: {this.state.distance}
                </Text>
                <Text style={styles.timer}>{this.state.timer}</Text>
                <View style={styles.button}>
                    <Button
                        title={this.state.button_text}
                        style={styles.button}
                        onPress={() => {
                            this.startPressed()
                        }}
                    />
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    add: activity => {
        dispatch(addActivity(activity))
    },
})

export default connect(null, mapDispatchToProps)(RunningScreen)

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: backgroundColor,
        height: '100%',
        justifyContent: 'space-between',
    },
    mainContent: {
        backgroundColor: 'green',
    },
    text: {
        padding: 10,
        flex: 3,
    },
    timer: {
        fontSize: 80,
        fontWeight: '200',
        flex: 5,
        fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
    },
    button: {
        width: '90%',
        justifyContent: 'flex-end',
        paddingBottom: 20,
    },
})
