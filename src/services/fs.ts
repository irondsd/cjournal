var RNFS = require('react-native-fs')
import { backendUrl, extensionsToRemove } from '../constants'

export async function moveToParentDir(filepath: string, filename: string) {
    RNFS.moveFile(filepath, RNFS.DocumentDirectoryPath + '/' + filename).then(
        () => {
            // successfull move
            // console.log('moved filename')
        },
    )
}

export async function downloadFile(url: string) {
    const filename = url.split('/')[1]
    const filepath = RNFS.DocumentDirectoryPath + '/' + filename
    url = backendUrl + '/' + url

    // RNFS.readdir(RNFS.DocumentDirectoryPath).then(res => {
    //     console.log(res)
    // })

    if (await RNFS.exists(filepath)) {
        // console.log('EXISTS')
    } else {
        // console.log('DOES NOT EXIST', filepath)

        const DownloadFileOptions = {
            fromUrl: url,
            toFile: filepath,
        }
        RNFS.downloadFile(DownloadFileOptions)
            .promise.then((res: any) => {
                // console.log('download', res, url)
            })
            .catch((err: Error) => {
                console.log('download failed', err)
            })
    }
}

export async function deleteFile(filepath: string) {
    RNFS.unlink(filepath)
}

export async function clearFiles() {
    const junkFiles: string[] = []
    RNFS.readDir(RNFS.DocumentDirectoryPath).then(
        (res: { name: string; path: string }[]) => {
            for (const file of res) {
                const split = file.name.split('.')
                if (split.length > 2) {
                    const ext = split[split.length - 1]
                    if (extensionsToRemove.includes(ext)) {
                        junkFiles.push(file.path)
                    }
                }
            }

            for (const path of junkFiles) RNFS.unlink(path)
        },
    )
}

export async function getFilesCount(): Promise<number> {
    return RNFS.readDir(RNFS.DocumentDirectoryPath).then(
        (res: { name: string; path: string }[]) => {
            console.log(res)
            return res.length
        },
    )
}
