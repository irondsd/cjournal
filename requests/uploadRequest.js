import RNFS from 'react-native-fs'
import { apiUrl } from '../constants'

// TODO: better
export const uploadRequest = (path, method, access_token, activity) => {
    return new Promise((resolve, reject) => {
        const uploadUrl = apiUrl + path
        const files = []

        if (activity.data.audioFile)
            files.push({
                name: 'audio',
                filename: 'audio.wav',
                filepath: activity.data.audioFile,
                filetype: 'audio/wave',
            })
        if (activity.data.photoFile)
            files.push({
                name: 'image',
                filename: 'image.jpg',
                filepath: activity.data.photoFile,
                filetype: 'image/jpeg',
            })

        let fields = { ...activity }

        let data = { ...activity.data }
        delete data.photoFile
        delete data.audioFile
        fields.data = data

        for (key in fields) {
            if (typeof fields[key] !== 'string')
                fields[key] = JSON.stringify(fields[key])
        }

        RNFS.uploadFiles({
            toUrl: uploadUrl,
            files: files,
            method: method,
            headers: {
                Authorization: 'Bearer ' + access_token,
            },
            fields: {
                ...fields,
            },
        })
            .promise.then(response => {
                if (res.ok) return resolve({ status: response.statusCode, ok: true })
                reject({ { status: response.statusCode, ok: false } })
            })
            .catch(err => {
                console.error(err)
                reject(err)
            })
    })
}
