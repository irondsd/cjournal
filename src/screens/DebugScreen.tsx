import React, { FC } from 'react'
import { View } from 'react-native'
import { defaultStyles } from '../constants'
import timestamp from '../helpers/timestamp'
import { Button } from '../components/Button'
import { scheduleNotification } from '../notifications/notifications'
import { idinvWatcher } from '../services/idinvWatcher'
import { activityAsyncSave } from '../services/asyncStorage'
import { uploadRequest } from '../requests/uploadRequest'
import { logPath, readLog } from '../services/logger'
import { useUser } from '../context/userContext'
import { useAuth } from '../context/authContext'
import { login } from '../requests/login'
import { useSync } from '../hooks/useSync'

export const DebugScreen: FC = () => {
    const { _id, idinv, load: userLoad } = useUser()
    const { access_token, refresh } = useAuth()
    const { syncActivities } = useSync()

    const uploadFile = () => {
        // todo: fix
        // const activity = Activity.instantInit('Stairs', '', {
        //     logFile: logPath,
        // })
        // uploadRequest(`users/${_id}/activity`, 'POST', access_token, activity)
        //     .then(res => console.log('upload success', res))
        //     .catch(err => console.log('upload error: ', err))
    }

    return (
        <View style={defaultStyles.container}>
            <Button
                title={'run idinv watcher'}
                onPress={() => {
                    idinvWatcher(_id, access_token, idinv)
                }}
            />
            <Button
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
            <Button
                title={'refresh tokens'}
                onPress={() => {
                    refresh()
                }}
            />
            <Button
                title={'sync activities'}
                onPress={() => {
                    syncActivities()
                }}
            />
            <Button
                title={'clear activity localstorage'}
                onPress={() => {
                    activityAsyncSave([])
                }}
            />

            <Button
                title={'upload log'}
                onPress={() => {
                    uploadFile()
                }}
            />
            <Button
                title={'read log'}
                onPress={async () => {
                    const log = await readLog()
                    console.log(log)
                }}
            />
            <Button
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
