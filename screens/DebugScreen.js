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
import { secs2time } from '../helpers/dateTime'
import BackgroundTimer from 'react-native-background-timer'
import { strings } from '../localizations'
import { addActivity } from '../redux/actions'
import { connect } from 'react-redux'
import { HeaderBackButton } from 'react-navigation'
// import KeepAwake from 'react-native-keep-awake'
import { backgroundColor, paths, defaultStyles } from '../constants'
import Activity from '../classes/Activity'
import timestamp from '../helpers/timestamp'
import SaveButton from '../components/SaveButton'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
    cancelLocalNotification,
    scheduleNotification,
} from '../notifications/notifications'

class Debug extends Component {
    static navigationOptions = {
        title: 'Debug',
    }

    render() {
        return (
            <View style={defaultStyles.container}>
                <TouchableOpacity
                    style={{ width: 200, height: 50 }}
                    onPress={() => {
                        let dateTime = new Date()
                        dateTime.setSeconds(dateTime.getSeconds() + 10)
                        scheduleNotification(999, 'Title', 'Message', dateTime)
                    }}>
                    <Text>Schedule</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ width: 200, height: 50 }}
                    onPress={() => {
                        cancelLocalNotification(999)
                    }}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    add: activity => {
        dispatch(addActivity(activity))
    },
})

export default connect(null, mapDispatchToProps)(Debug)

const styles = StyleSheet.create({
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
