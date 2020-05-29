import userUpdateIdinv from '../requests/userUpdateIdinv'
import { stateIniFilePath } from '../constants'
import { userFetchData } from '../requests/userFetchData'
import { requestExternalReadPermission } from '../permissions/requestStoragePermission'
var RNFS = require('react-native-fs')
import store from '../redux/store'
import { Alert } from 'react-native'

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
                                store.dispatch(userFetchData(id, access_token))
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
