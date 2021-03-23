import RNFS from 'react-native-fs'
import { IActivity } from '../classes/Activity'
import { apiUrl } from '../constants'

export const uploadRequest = (
    path: string,
    method: 'POST' | 'PUT',
    access_token: string,
    activity: IActivity,
) => {
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

        let fields: { [key: string]: any } = { ...activity }

        let data = { ...activity.data }
        delete data.photoFile
        delete data.audioFile
        fields.data = data

        for (const key in fields) {
            if (typeof fields[key] !== 'string')
                fields[key] = JSON.stringify(fields[key])
        }
        console.log(files)
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
                // console.log(res)
                if (res.statusCode === 201 || res.statusCode === 200)
                    return resolve({
                        status: res.statusCode,
                        ok: true,
                        body: res.body,
                        message: 'successfully uploaded',
                    })
                reject({ status: res.statusCode, ok: false })
            })
            .catch(err => {
                console.log('UPLOAD ERROR: ', err)
                reject({ error: err })
            })
    })
}