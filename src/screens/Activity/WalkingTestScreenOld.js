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
import { secs2time, getUtcOffset } from '../../helpers/dateTime'
import BackgroundTimer from 'react-native-background-timer'
import { strings } from '../../localization'
import { addActivity } from '../../redux/actions'
import { connect } from 'react-redux'
import { HeaderBackButton } from 'react-navigation'
import { calculateDistance } from '../../helpers/GPS'
import {
    backgroundColor,
    ActivityTypes,
    Routes,
    defaultStyles,
    walkingDuration,
    appColor,
    secondaryColor,
    secondaryGrey,
    width,
} from '../../constants'
import { BackButton } from '../../components/BackButton'
import { showError } from '../../services/toast'
import Activity from '../../classes/Activity'
import timestamp from '../../helpers/timestamp'
import requestLocationPermissions from '../../permissions/requestLocationPermissions'
import GPS from '../../sensors/GPS'
import Pedometer from '../../sensors/Pedometer'
import SaveButton from '../../components/SaveButton'
import { findLatestTask } from '../../classes/Task'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { createIconSetFromFontello } from 'react-native-vector-icons'

let timerOn = false

class WalkingTestScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.WalkingTest,
        headerLeft: (
            <BackButton
                onPress={() => {
                    if (timerOn) Alert.alert(strings.Alert, strings.CantGoBack)
                    else navigation.goBack()
                }}
            />
        ),
    })

    constructor(props) {
        super(props)

        this.handleBackButton = this.handleBackButton.bind(this)

        this.state = {
            timer: '0:00',
            task: null,
            progress: 100,
            distance: 0,
            steps: 0,
            started: false,
            timestampStart: 0,
            timestampEnd: 0,
        }

        this.GPS = new GPS()
        this.Pedometer = new Pedometer()
    }

    handleBackButton() {
        if (this.state.timer_set) {
            return true
        }
    }

    componentDidMount() {
        requestLocationPermissions()
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
        let task = findLatestTask(this.props.tasks, ActivityTypes.WalkingTest)
        if (
            this.props.navigation.state.params &&
            this.props.navigation.state.params.task
        ) {
            task = this.props.navigation.state.params.task
        }
        this.setState({
            timer: secs2time(walkingDuration),
            task: task,
        })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButton,
        )

        this.Pedometer.stopUpdates()
        this.GPS.watchStop()
        this.timerStop()
        timerOn = false
    }

    record() {
        let data = {
            steps: this.state.steps,
            distance: this.state.distance,
            position: this.GPS.getFirstAndLastPosition(),
        }

        let activity = Activity.init(
            ActivityTypes.WalkingTest,
            this.state.timestampStart,
            timestamp(),
            this.state.task,
            undefined,
            data,
        )
        this.props.add(activity)
        this.props.navigation.navigate(Routes.ExerciseFinish, {
            activity: activity,
        })
    }

    timerStart() {
        timerOn = true
        // this timer is to update the screen
        this.intervalId = BackgroundTimer.setInterval(() => {
            this.timerTick()
        }, 1000)

        // timeout for 6 minutes
        this.timeoutId = BackgroundTimer.setTimeout(() => {
            this.timerStop()
            this.record()
        }, walkingDuration * 1000)

        this.setState(prevstate => ({
            started: true,
            timestampStart: timestamp(),
            timestampEnd: timestamp() + walkingDuration,
        }))

        this.GPS.watchStart()
        this.Pedometer.startUpdates(new Date())
    }

    startPressed() {
        if (!this.state.started) {
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
        let time = this.state.timestampEnd - timestamp()

        // console.log(time)

        this.setState({
            timer: secs2time(time),
            distance: this.GPS.distance,
            steps: this.Pedometer.steps,
            progress: time / 3.6,
        })

        if (time === 0) {
            // time ran out
            Vibration.vibrate(600)
            this.timerStop()
            this.record()
        }
        if (time < 0) {
            // time ran out before
            this.setState({
                timer: '00:00',
            })
            this.timerStop()
            this.record()
        }
    }

    timerStop() {
        BackgroundTimer.clearInterval(this.intervalId)
        BackgroundTimer.clearTimeout(this.timeoutId)
        this.GPS.watchStop()
        this.Pedometer.stopUpdates()

        timerOn = false
    }

    render() {
        return (
            <View style={defaultStyles.container}>
                <View style={styles.stats}>
                    <View style={styles.textSteps}>
                        <Text style={styles.text}>{strings.Steps}</Text>
                        <Text style={styles.number}>{this.state.steps}</Text>
                    </View>
                    <View style={styles.textDistance}>
                        <Text style={styles.text}>{strings.Distance}</Text>
                        <Text style={styles.number}>{this.state.distance}</Text>
                    </View>
                </View>
                <View style={styles.timerView}>
                    <AnimatedCircularProgress
                        size={width / 1.3}
                        width={2}
                        fill={this.state.progress}
                        rotation={180}
                        tintColor={'#00000055'}
                        backgroundColor="#00000000">
                        {() => (
                            <Text style={styles.timer}>{this.state.timer}</Text>
                        )}
                    </AnimatedCircularProgress>
                </View>
                <View style={styles.button}>
                    <SaveButton
                        title={
                            this.state.started
                                ? strings.Terminate
                                : strings.Start
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(WalkingTestScreen)

const styles = StyleSheet.create({
    stats: {
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
    },
    number: {
        fontSize: 25,
    },
    timerView: {
        flex: 3,
        justifyContent: 'center',
    },
    timer: {
        fontSize: width / 5,
        fontWeight: '200',
        color: '#00000055',
        fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
    },
    button: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
    },
})
