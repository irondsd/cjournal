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
            .promise.then(res => {
                console.log(res)
                if (res.statusCode === 201 || res.statusCode === 200)
                    return resolve({
                        status: res.statusCode,
                        ok: true,
                        message: 'successfully uploaded',
                    })
                reject({ status: res.statusCode, ok: false })
            })
            .catch(err => {
                console.error(err)
                reject({ error: err })
            })
    })
}
