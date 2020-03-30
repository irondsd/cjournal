import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    BackHandler,
    StatusBar,
    Alert,
} from 'react-native'
import { secs2time } from '../../helpers/dateTime'
import { connect } from 'react-redux'
import { addActivity } from '../../redux/actions'
import { strings } from '../../localizations'
import { backgroundColor, paths, activityTypes } from '../../constants'
import Activity from '../../classes/Activity'
import timestamp from '../../helpers/timestamp'
import { screenAsyncSave, removeScreen } from '../../services/asyncStorage'

class SleepScreen extends Component {
    static navigationOptions = {
        header: null,
        headerLeft: null,
    }

    constructor(props) {
        super(props)

        this.state = {
            message: strings.HaveAGoodSleep,
            timer: '0:00',
            button_text: strings.Terminate,
            startDate: null,
            endDate: null,
        }

        this.handleBackButton = this.handleBackButton.bind(this)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButton,
        )
        clearInterval(this.state.intervalId)
    }

    handleBackButton() {
        // this.finish()
        Alert.alert(
            'Terminate?',
            'Do you really want to terminate Sleep?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        )
        return true
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)

        let currentTime = new Date()
        this.setState({
            timer: secs2time(0),
            startDate: this.props.navigation.state.params
                ? new Date(this.props.navigation.state.params.startDate)
                : currentTime,
        })
        screenAsyncSave({
            screen: 'Sleep',
            startDate: currentTime.getTime(),
        })

        let intervalId = setInterval(() => {
            let currentTime = new Date()
            let seconds = Math.abs(
                currentTime - this.state.startDate,
            ).toString()
            seconds = seconds.substring(0, seconds.length - 3)
            if (!seconds) seconds = 0
            // console.log(seconds)
            this.setState({
                timer: secs2time(seconds),
            })
        }, 1000)
        this.setState({
            intervalId: intervalId,
        })
    }

    finish() {
        clearInterval(this.state.intervalId)
        removeScreen()
        let activity = new Activity(
            null,
            activityTypes.Sleep,
            timestamp(this.state.startDate),
            timestamp(),
            null,
            this.props.idinv,
            timestamp(),
            '',
            {},
        )
        this.props.add(activity)
        this.props.navigation.navigate(paths.Home)
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'black'} barStyle="light-content" />
                <Text style={styles.text}>{this.state.message}</Text>
                <Text style={styles.timer}>{this.state.timer}</Text>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.finish()
                        }}>
                        <Text style={styles.buttonText}>
                            {this.state.button_text}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        idinv: state.user.idinv,
    }
}

const mapDispatchToProps = dispatch => ({
    add: activity => {
        dispatch(addActivity(activity))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SleepScreen)

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: backgroundColor,
        height: '100%',
        justifyContent: 'space-between',
        backgroundColor: 'black',
    },
    text: {
        padding: 10,
        flex: 3,
        color: 'grey',
    },
    timer: {
        fontSize: 80,
        fontWeight: '200',
        flex: 5,
        color: 'rgba(255, 255, 255, 0.3)',
        fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
    },
    button: {
        width: '90%',
        color: 'grey',
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 30,
    },
})
