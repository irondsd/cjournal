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
// import KeepAwake from 'react-native-keep-awake'
import { backgroundColor, paths } from '../../constants'
import Activity from '../../classes/Activity'
import timestamp from '../../helpers/timestamp'

class WalkingScreen extends Component {
    static navigationOptions = {
        title: strings.Orthostasis,
        headerLeft: null,
    }

    state = {
        timer: '5:00',
        time_seconds: 300,
        timer_set: false,
        button_text: strings.Start,
        intervalId: 0,
        startDate: new Date(),
        stage: 0,
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButton,
        )
        Pedometer.stopPedometerUpdates()
    }

    handleBackButton() {
        return true
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
    }

    measurePressure() {
        // measure
    }

    record() {
        KeepAwake.deactivate()
        data = {
            pressureLaying: 1,
            pressureStanding: 1,
        }
        let activity = new Activity(
            null,
            activityTypes.Orthostasis,
            timestamp(this.state.startDate),
            timestamp(),
            tasks_id,
            timestamp(),
            '',
            data,
        )
        this.props.add(activity)
        this.props.navigation.navigate(paths.Home)
    }

    componentWillUnmount() {
        this.timerStop()
    }

    timerStart() {
        KeepAwake.activate()
        console.log('timer started')
        // this timer is to update the screen
        const intervalId = BackgroundTimer.setInterval(() => {
            this.timerTick()
        }, 1000)
        this.setState(prevState => ({
            intervalId: intervalId,
            stage: prevState.stage === 0 ? 1 : 2,
        }))
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
            // play sound
            Vibration.vibrate(500)
            this.measurePressure()
            this.timerStop()
            this.setState({
                button_text: strings.Start,
            })
            if (this.state.stage === 1) {
                this.setStageTwo()
            }
            if (this.state.stage === 2) {
                // make a record
                this.record()
            }
        }
    }

    measurePressure() {
        // code here
    }

    timerStop() {
        BackgroundTimer.clearInterval(this.state.intervalId)
    }

    setStageTwo() {
        this.setState({
            time_seconds: 300,
            timer: '5:00',
            timer_set: false,
            stage: 1,
            button_text: 'Start',
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Info</Text>
                <Text style={styles.text}>{'Stage: ' + this.state.stage}</Text>
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

export default connect(null, mapDispatchToProps)(WalkingScreen)

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
    stage: {
        position: 'absolute',
        top: 50,
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
