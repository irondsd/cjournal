import userUpdateIdinv from '../requests/userUpdateIdinv'

var RNFS = require('react-native-fs')

export async function idinvWatcher(id, access_token, idinv) {
    // console.log(RNFS.DocumentDirectoryPath)
    let filepath = '/storage/emulated/0/.incart/state.ini'
    RNFS.exists(filepath).then(res => {
        // console.log('state.ini', res)
        RNFS.readFile(filepath, 'utf8').then(res => {
            let is_recording
            let parsed_idinv
            try {
                is_recording = res.match(/is_recording = (\w+)/)[1]
                parsed_idinv = res.match(/idinv = (\w+).dat/)[1]
                if (idinv !== parsed_idinv) {
                    // post request to update
                    userUpdateIdinv(id, access_token, parsed_idinv).then(
                        res => {
                            if (res.ok) console.log('idinv updated')
                        },
                    )
                } else {
                    console.log('idinv match')
                }
            } catch (error) {
                // something went wrong
            }
        })
    })
}
