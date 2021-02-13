import userUpdateIdinv from '../requests/userUpdateIdinv'
import { stateIniFilePath } from '../constants'
import { requestExternalReadPermission } from '../permissions/requestStoragePermission'
import RNFS from 'react-native-fs'
import store from '../redux/store'
import { Alert } from 'react-native'
import { setIdinvFilter, updateUser, userFetchFailed } from '../redux/actions'
import { Get } from '../requests/newRequest'

export async function idinvWatcher(id, access_token, idinv) {
    let filepath = stateIniFilePath
    // console.log('reading', filepath)

    await requestExternalReadPermission()

    RNFS.exists(filepath).then(res => {
        if (!res) return // no state.ini file
        RNFS.readFile(filepath, 'utf8').then(res => {
            let is_recording
            let parsed_idinv
            // console.log('idinv', res)
            try {
                is_recording = res.match(/is_recording = (\w+)/)[1]
                parsed_idinv = res.match(/idinv = (\w+)/)[1]
                if (idinv !== parsed_idinv) {
                    // post request to update
                    userUpdateIdinv(id, access_token, parsed_idinv).then(
                        res => {
                            if (res.ok) {
                                console.log('idinv updated')
                                Get(`users/${id}`, access_token)
                                    .then(res =>
                                        store.dispatch(updateUser(res)),
                                    )
                                    .catch(err =>
                                        store.dispatch(userFetchFailed()),
                                    ),
                                    store.dispatch(setIdinvFilter(true))
                            }
                        },
                    )
                } else {
                    // console.log('idinv match')
                }
            } catch (err) {
                // console.log(err)
            }
        })
    })
}
