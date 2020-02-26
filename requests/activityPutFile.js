var RNFS = require('react-native-fs')
import { apiUrl } from '../constants'

export default async function activityPostData(id, access_token, activity) {
    const uploadUrl = apiUrl + `users/${id}/activity/${activity.id}`
    var files = []

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

    var uploadBegin = response => {
        // var jobId = response.jobId
        // console.log('UPLOAD HAS BEGUN! JobId: ' + jobId)
    }

    var uploadProgress = response => {
        // var percentage = Math.floor((response.totalBytesSent / response.totalBytesExpectedToSend) * 100)
        // console.log('UPLOAD IS ' + percentage + '% DONE!')
    }

    let fields = { ...activity }

    let data = { ...activity.data }
    delete data.photoFile
    delete data.audioFile
    fields.data = data

    for (key in fields) {
        if (typeof fields[key] !== 'string')
            fields[key] = JSON.stringify(fields[key])
    }
    // upload files
    return RNFS.uploadFiles({
        toUrl: uploadUrl,
        files: files,
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + access_token,
        },
        fields: {
            ...fields,
        },
        begin: uploadBegin,
        progress: uploadProgress,
    })
        .promise.then(response => {
            // console.log('FILES UPLOADED!') // response.statusCode, response.headers, response.body
            return JSON.parse(response.body)
        })
        .catch(err => {
            if (err.description === 'cancelled') {
                // cancelled by user
            }
            console.log(err)
        })
}
