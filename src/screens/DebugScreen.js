import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux'
import { logoutUser, addActivity } from '../redux/actions'
import {
    backgroundColor,
    paths,
    ActivityTypes,
    defaultStyles,
    borderGrey,
} from '../constants'
import { strings } from '../localization'
import { CameraKitCameraScreen } from 'react-native-camera-kit'
import Icon from 'react-native-vector-icons/FontAwesome'
import Activity from '../classes/Activity'
import timestamp from '../helpers/timestamp'
import requestCameraPermission from '../permissions/requestCameraPermissions'
import SaveButton from '../components/SaveButton'
import {
    cancelLocalNotification,
    scheduleNotification,
} from '../notifications/notifications'
import { getUtcOffset } from '../helpers/dateTime'
import sync from '../services/sync'
import { idinvWatcher } from '../services/idinvWatcher'
import { activityAsyncSave } from '../services/asyncStorage'
import { uploadRequest } from '../requests/uploadRequest'
import RNFS from 'react-native-fs'
import { Get, Post } from '../requests/newRequest'
import { logPath, readLog, writeLog } from '../services/logger'

class DebugScreen extends Component {
    static navigationOptions = {
        title: 'Debug',
    }

    uploadFile() {
        const activity = Activity.instantInit('Stairs', '', {
            logFile: logPath,
        })

        uploadRequest(
            `users/${this.props.user._id}/activity`,
            'POST',
            this.props.tokens.access_token,
            activity,
        )
            .then(res => console.log('upload success', res))
            .catch(err => console.log('upload error: ', err))
    }

    render() {
        return (
            <View style={defaultStyles.container}>
                <SaveButton
                    title={'run idinv watcher'}
                    onPress={() => {
                        idinvWatcher(
                            this.props.user._id,
                            this.props.tokens.access_token,
                            this.props.user.idinv,
                        )
                    }}
                />
                <SaveButton
                    title={'run sync'}
                    onPress={() => {
                        sync(this.props.user._id, this.props.tokens)
                    }}
                />
                <SaveButton
                    title={'refresh tokens'}
                    onPress={() => {
                        this.props.tokens
                            .update()
                            .then(res => {
                                console.log(res)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }}
                />
                <SaveButton
                    title={'clear activity localstorage'}
                    onPress={() => {
                        activityAsyncSave([])
                    }}
                />

                <SaveButton
                    title={'upload log'}
                    onPress={() => {
                        this.uploadFile()
                    }}
                />
                <SaveButton
                    title={'read log'}
                    onPress={async () => {
                        const log = await readLog()
                        console.log(log)
                    }}
                />
                <SaveButton
                    title={'notification in 10 sec'}
                    onPress={async () => {
                        scheduleNotification(
                            '6069b8e036a80830b443739d',
                            'Test',
                            'Test notification for debug',
                            timestamp() + 10,
                        )
                    }}
                />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        tokens: state.tokens,
    }
}

const mapDispatchToProps = dispatch => ({
    add: activity => {
        dispatch(addActivity(activity))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(DebugScreen)
