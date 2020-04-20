var RNFS = require('react-native-fs')
import { backendUrl } from '../constants'

export async function moveToParentDir(filepath, filename) {
    // console.log(filepath, RNFS.DocumentDirectoryPath + '/' + filename)
    RNFS.moveFile(filepath, RNFS.DocumentDirectoryPath + '/' + filename).then(
        () => {
            // successfull move
            // console.log('moved filename')
        },
    )
}

export async function downloadFile(url) {
    let filename = url.split('/')[1]
    let filepath = RNFS.DocumentDirectoryPath + '/' + filename
    url = backendUrl + '/' + url

    // RNFS.readdir(RNFS.DocumentDirectoryPath).then(res => {
    //     console.log(res)
    // })

    if (await RNFS.exists(filepath)) {
        // console.log('EXISTS')
    } else {
        // console.log('DOES NOT EXIST', filepath)

        let DownloadFileOptions = {
            fromUrl: url,
            toFile: filepath,
        }
        RNFS.downloadFile(DownloadFileOptions)
            .promise.then(res => {
                // console.log('download', res, url)
            })
            .catch(err => {
                // console.log('download failed', err)
            })
    }
}

export async function deleteFile(filepath) {
    RNFS.unlink(filepath)
}

export async function clearFiles() {
    let junk = []
    RNFS.readDir(RNFS.DocumentDirectoryPath).then(res => {
        for (file of res) {
            if (file.name.includes('.wav') || file.name.includes('.jpg')) {
                junk.push(file.path)
            }
        }

        for (path of junk) {
            RNFS.unlink(path)
        }
    })
}
