import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import { logoutUser, addActivity } from '../redux/actions'
import {
    backgroundColor,
    paths,
    activityTypes,
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
import { cancelLocalNotification } from '../notifications/notifications'
import { getUtcOffset } from '../helpers/dateTime'
import sync from '../services/sync'
import { idinvWatcher } from '../services/idinvWatcher'
import { activityAsyncSave } from '../services/asyncStorage'
import { uploadRequest } from '../requests/uploadRequest'
import RNFS from 'react-native-fs'
import { Get, Post } from '../requests/newRequest'

class DebugScreen extends Component {
    static navigationOptions = {
        title: 'Debug',
    }

    uploadFile() {
        const filepath = `/storage/emulated/0/Pictures/1615886423543.jpg`
        const activity = Activity.instantInit('Stairs', 'test test', {
            photoFile: filepath,
        })
        uploadRequest(
            'users/6038c6126b418c4b34dfb227/activity',
            'POST',
            this.props.tokens.access_token,
            activity,
        )
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
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
                    title={'upload file'}
                    onPress={() => {
                        this.uploadFile()
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
