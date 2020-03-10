import userUpdateIdinv from '../requests/userUpdateIdinv'

var RNFS = require('react-native-fs')

export async function idinvWatcher(id, access_token, idinv) {
    // console.log(RNFS.DocumentDirectoryPath)
    let filepath = '/storage/emulated/0/.incart/state.ini'
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
                            if (res.ok) console.log('idinv updated')
                        },
                    )
                } else {
                    console.log('idinv match')
                }
            } catch (err) {
                console.log(err)
            }
        })
    })
}
