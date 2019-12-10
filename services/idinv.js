var RNFS = require('react-native-fs')

export async function readStateFile(idinv) {
    // console.log(RNFS.DocumentDirectoryPath)
    let filepath = '/storage/emulated/0/.incart/state.ini'
    RNFS.exists(filepath)
        .then(res => {
            // console.log('state.ini', res)
            RNFS.readFile(filepath, 'utf8').then(res => {
                let is_recording
                try {
                    is_recording = res.match(/is_recording = (\w+)/)[1]
                    parsed_idinv = res.match(/idinv = (\w+).dat/)[1]

                    if (idinv !== parsed_idinv) {
                        // post request to update
                    }
                } catch (error) {
                    // something went wrong
                }
            })
        })
        .catch(() => {
            // console.log('no state file')
        })
}
