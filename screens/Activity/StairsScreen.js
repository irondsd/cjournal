import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    BackHandler,
} from 'react-native'
import { secs2time } from '../../helpers/dateTime'
import BackgroundTimer from 'react-native-background-timer'
import { strings } from '../../localizations'
import { addActivity } from '../../redux/actions'
import { connect } from 'react-redux'
import { HeaderBackButton } from 'react-navigation'
// import { barometer } from 'react-native-sensors'
import { average, altMeter } from '../../helpers/math'
// import KeepAwake from 'react-native-keep-awake'
import { cancelNotification } from '../../redux/actions'
import { backgroundColor, paths, activity_types } from '../../properties'
import BackButton from '../../components/BackButton'
import Activity from '../../classes/Activity'
import timestamp from '../../helpers/timestamp'
import Barometer from '../../sensors/Barometer'

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
            mmHg: 0,
        }

        this.handleBackButton = this.handleBackButton.bind(this)
        this.update = this.update.bind(this)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButton,
        )
    }

    handleBackButton() {
        if (this.state.started) {
            return true
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)

        // zero it out
        this.setState({
            startDate: new Date(),
            meters: '0.0',
            tasks_id: 0,
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
        }
        if (this.state.metersAcc === 0) data.failed = true
        let activity = new Activity(
            null,
            activity_types.Stairs,
            timestamp(this.state.startDate),
            timestamp(),
            tasks_id,
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

        let rmeters = altMeter(initialPressure, average(pressures)).toFixed(1)
        if (meters == -Infinity || meters == -0.0) meters = '0.0'

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
        this.record()
    }

    startPressed() {
        started = true
        if (!this.intervalId) {
            this.setState({
                started: true,
                button_text: strings.Finish,
            })
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
            <View style={styles.container}>
                <Text style={styles.text}>
                    {strings.Pressure}: {this.state.mmHg} {strings.mmHg}
                </Text>
                <Text style={styles.timer}>{this.state.meters}</Text>
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

export default connect(null, mapDispatchToProps)(StairsScreen)

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
