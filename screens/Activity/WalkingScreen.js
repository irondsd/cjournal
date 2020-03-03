import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    BackHandler,
    Vibration,
} from 'react-native'
import { secs2time } from '../../helpers/dateTime'
import BackgroundTimer from 'react-native-background-timer'
import { strings } from '../../localizations'
import { addActivity, cancelNotification } from '../../redux/actions'
import { connect } from 'react-redux'
import { HeaderBackButton } from 'react-navigation'
import { calculateDistance } from '../../helpers/GPS'
import {
    backgroundColor,
    activityTypes,
    paths,
    defaultStyles,
} from '../../constants'
import BackButton from '../../components/BackButton'
import { showError } from '../../services/toast'
import Activity from '../../classes/Activity'
import timestamp from '../../helpers/timestamp'
import requestLocationPermissions from '../../permissions/requestLocationPermissions'
import GPS from '../../sensors/GPS'
import Pedometer from '../../sensors/Pedometer'
import SaveButton from '../../components/SaveButton'

const duration = 360 // 6 minutes
let timerOn = false

class WalkingScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.Walking,
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
            time_seconds: duration,
            timer_set: false,
            button_text: strings.Start,
            intervalId: 0,
            timeoutId: 0,
            startDate: null,
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
        // Pedometer.stopPedometerUpdates();
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
            timer: secs2time(duration),
            tasks_id: this.props.navigation.state.params
                ? this.props.navigation.state.params.tasks_id
                : null,
        })

        if (this.props.navigation.state.params)
            cancelNotification(this.props.navigation.state.params.tasks_id)

        // Pedometer.isStepCountingAvailable((error, isAvailable) => {
        //   if (isAvailable) {
        //     Pedometer.startPedometerUpdatesFromDate(
        //       this.state.startDate.getTime(),
        //       pedometerData => {
        //         if (this.state.timer_set) {
        //           this.setState({
        //             numberOfSteps: pedometerData.numberOfSteps
        //             // distance: Math.round(pedometerData.distance * 10) / 10
        //           });
        //         }
        //       }
        //     );
        //   }
        // });
    }

    //   requestPosition() {
    //     navigator.geolocation.getCurrentPosition(
    //       position => {
    //         console.log("Got position", position.coords);
    //         let distance = 0;
    //         if (this.state.positions[this.state.positions.length - 1]) {
    //           distance =
    //             calculateDistance(
    //               this.state.positions[this.state.positions.length - 1][0],
    //               this.state.positions[this.state.positions.length - 1][1],
    //               position.coords.latitude,
    //               position.coords.longitude
    //             ).toFixed(3) * 1000;
    //         }
    //         this.setState(prevState => ({
    //           positions: [
    //             ...prevState.positions,
    //             [position.coords.latitude, position.coords.longitude]
    //           ],
    //           distance: prevState.distance + distance
    //         }));
    //       },
    //       error => console.log(error.message),
    //       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    //     );
    //   }

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

    record() {
        tasks_id = this.state.tasks_id ? parseInt(this.state.tasks_id) : null
        if (tasks_id) cancelNotification(tasks_id)
        endDate = new Date()
        data = {
            steps: this.state.numberOfSteps ? this.state.numberOfSteps : 0,
            distance: this.state.distance ? this.state.distance : 0,
        }
        if (this.state.time_seconds >= 300) data.failed = true
        // if (this.state.positions.length > 0) {
        //   data.positionStart = this.state.positions[0];
        //   data.positionEnd = this.state.positions[this.state.positions.length - 1];
        // }
        let positions = this.GPS.getFirstAndLastPosition()
        data = {
            ...data,
            ...positions,
        }

        let activity = new Activity(
            null,
            activityTypes.Walking,
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
            time_seconds: prevState.time_seconds - 1,
            timer: secs2time(prevState.time_seconds - 1),
        }))

        if (this.state.time_seconds === 0) {
            // time ran out
            Vibration.vibrate(600)
            // Pedometer.stopPedometerUpdates();
            //   navigator.geolocation.clearWatch(this.state.watchID);
            this.timerStop()
            this.record()
        }

        // if (this.state.time_seconds % 10 === 0) {
        //   this.requestPosition();
        // }
    }

    timerStop() {
        // navigator.geolocation.clearWatch(this.state.watchID);
        BackgroundTimer.clearInterval(this.state.intervalId)
        // Pedometer.stopPedometerUpdates();
        this.GPS.watchStop()
        this.Pedometer.stopUpdates()
    }

    render() {
        return (
            <View style={defaultStyles.container}>
                <Text style={styles.text}>
                    {strings.Steps}: {this.state.numberOfSteps},{' '}
                    {strings.Distance}: {this.state.distance}
                </Text>
                <Text style={styles.timer}>{this.state.timer}</Text>
                <View style={styles.button}>
                    <SaveButton
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

export default connect(null, mapDispatchToProps)(WalkingScreen)

const styles = StyleSheet.create({
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
