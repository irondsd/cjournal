import React, { FC } from 'react'
import { View } from 'react-native'
import { defaultStyles } from '../constants'
import Activity from '../classes/Activity'
import timestamp from '../helpers/timestamp'
import SaveButton from '../components/SaveButton'
import { scheduleNotification } from '../notifications/notifications'
import { idinvWatcher } from '../services/idinvWatcher'
import { activityAsyncSave } from '../services/asyncStorage'
import { uploadRequest } from '../requests/uploadRequest'
import { logPath, readLog } from '../services/logger'
import { useUser } from '../context/userContext'
import { useAuth } from '../context/authContext'
import { login } from '../requests/login'

export const DebugScreen: FC = () => {
    const { _id, idinv, load: userLoad } = useUser()
    const { access_token, refresh } = useAuth()

    const uploadFile = () => {
        const activity = Activity.instantInit('Stairs', '', {
            logFile: logPath,
        })

        uploadRequest(`users/${_id}/activity`, 'POST', access_token, activity)
            .then(res => console.log('upload success', res))
            .catch(err => console.log('upload error: ', err))
    }

    return (
        <View style={defaultStyles.container}>
            <SaveButton
                title={'run idinv watcher'}
                onPress={() => {
                    idinvWatcher(_id, access_token, idinv)
                }}
            />
            <SaveButton
                title={'login'}
                onPress={() => {
                    login(access_token)
                        .then(user => {
                            userLoad(user)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }}
            />
            <SaveButton
                title={'refresh tokens'}
                onPress={() => {
                    refresh()
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
                    uploadFile()
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
