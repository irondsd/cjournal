import RNFS from 'react-native-fs'
import timestamp from '../helpers/timestamp'

type LogLevels = 'debug' | 'error' | 'info'

export const logPath = RNFS.DocumentDirectoryPath + '/cjournal.log'

export const writeLog = (level: LogLevels, message: string) => {
    RNFS.appendFile(logPath, `${level} : ${timestamp()} : ${message} \n`).catch(
        err => {
            console.log(err.message)
        },
    )
}

export const readLog = () => {
    return RNFS.readFile(logPath)
}

export const clearLog = () => {
    return RNFS.writeFile(logPath, '', 'utf8')
}
