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
import DeviceIdInput from '../components/DeviceIdInput'
import { cancelLocalNotification } from '../notifications/notifications'
import { getUtcOffset } from '../helpers/dateTime'
import sync from '../services/sync'
import { idinvWatcher } from '../services/idinvWatcher'
import { activityAsyncSave } from '../services/asyncStorage'

class DebugScreen extends Component {
    static navigationOptions = {
        title: 'Debug',
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
