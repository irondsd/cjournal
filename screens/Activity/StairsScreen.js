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
import Pedometer from '@JWWon/react-native-universal-pedometer'
import BackgroundTimer from 'react-native-background-timer'
import { strings } from '../../localizations'
import { addActivity } from '../../redux/actions'
import { connect } from 'react-redux'
import { HeaderBackButton } from 'react-navigation'
import { barometer } from 'react-native-sensors'
import { average, altMeter } from '../../helpers/math'
// import KeepAwake from 'react-native-keep-awake'
import { cancelNotification } from '../../redux/actions'
import { backgroundColor, paths, activity_types } from '../../properties'
import BackButton from '../../components/BackButton'
import Activity from '../../classes/Activity'
import timestamp from '../../helpers/timestamp'

pressuresArr = []
initialPressure = 0
let timerOn = false

class StairsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: strings.Stairs,
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

        this.state = {
            startDate: new Date(),
            barometer: null,
            meters: 0,
            metersAcc: 0,
            button_text: strings.Start,
            started: false,
            metersDes: 0,
            prevMeters: 0,
            tasks_id: 0,
            hPa: 0,
        }

        this.handleBackButton = this.handleBackButton.bind(this)
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
        console.log(this.props.navigation.state.params)
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)

        // zero it out
        pressuresArr = []
        this.setState({
            startDate: new Date(),
            meters: 0,
            metersAcc: 0,
            metersDes: 0,
            prevMeters: 0,
            tasks_id: 0,
            hPa: 0,
        })

        const bar = barometer.subscribe(
            ({ pressure }) => {
                if (initialPressure === 0 && pressuresArr.length > 30) {
                    initialPressure = average(pressuresArr)
                }
                pressuresArr.push(pressure)
                if (pressuresArr.length > 300) {
                    pressuresArr.splice(0, 1)
                }

                if (!this.state.started) {
                    return
                }

                meters = altMeter(
                    initialPressure,
                    average(pressuresArr),
                ).toFixed(1)
                if (meters == -Infinity || meters == -0.0) meters = '0.0'
                let metersAccended
                let metersDescended
                if (meters > -0.1) {
                    metersAccended =
                        this.state.prevMeters < meters
                            ? this.state.metersAcc + 0.05
                            : this.state.metersAcc
                    metersDescended =
                        this.state.prevMeters > meters
                            ? this.state.metersAcc - 0.05
                            : this.state.metersDes
                } else {
                    metersAccended =
                        this.state.prevMeters > meters
                            ? this.state.metersAcc + 0.05
                            : this.state.metersAcc
                    metersDescended =
                        this.state.prevMeters < meters
                            ? this.state.metersAcc - 0.05
                            : this.state.metersDes
                }
                this.setState(prevState => ({
                    tasks_id: this.props.navigation.state.params
                        ? this.props.navigation.state.params.tasks_id
                        : null,
                    metersAcc: metersAccended,
                    metersDes: metersDescended,
                    prevMeters: prevState.meters,
                    meters: meters,
                    hPa: average(pressuresArr),
                    mmHg: (
                        average(pressuresArr).toFixed(1) / 1.3332236
                    ).toFixed(0),
                }))
            },
            error => {
                alert('Barometer is not available on this device')
                this.props.navigation.navigate(paths.Home)
            },
        )

        this.setState({
            barometer: bar,
        })
    }

    record() {
        tasks_id = this.state.tasks_id ? parseInt(this.state.tasks_id) : null
        if (tasks_id) cancelNotification(tasks_id)

        endDate = new Date()
        data = {
            meters: this.state.metersAcc ? this.state.metersAcc.toFixed(1) : 0,
            metersDes: this.state.metersDes
                ? this.state.metersDes.toFixed(1)
                : 0,
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

    startPressed() {
        timerOn = true
        if (!this.state.started) {
            this.setState({
                started: true,
                button_text: strings.Finish,
            })
        } else {
            this.state.barometer.unsubscribe()
            this.record()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {strings.Pressure}: {this.state.mmHg} {strings.mmHg}
                </Text>
                <Text style={styles.timer}>
                    {this.state.metersAcc.toFixed(1)}
                </Text>
                {/* <Text style={styles.timer}>{this.state.meters}</Text>
                <Text style={styles.timer}>{this.state.hPa.toFixed(3)}</Text> */}
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
