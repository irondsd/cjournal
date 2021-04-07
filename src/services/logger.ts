import RNFS from 'react-native-fs'
import timestamp from '../helpers/timestamp'

type LogLevels = 'debug' | 'error' | 'info'

// General log functions
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

// Logger class for specific logs

interface ILogger {
    filename: string
    log: (level: LogLevels, message: string) => void
    read: () => Promise<string>
    remove: () => Promise<void>
}

export class Logger implements ILogger {
    filename: string

    constructor(filename: string) {
        this.filename = RNFS.DocumentDirectoryPath + '/' + filename + '.log'
        this.log('info', 'initialized logger')
    }

    log(level: LogLevels, message: string) {
        RNFS.appendFile(
            this.filename,
            `${level} : ${timestamp()} : ${message} \n`,
        ).catch(err => {
            console.log(err.message)
        })
    }

    read() {
        return RNFS.readFile(this.filename)
    }

    remove() {
        return RNFS.unlink(this.filename)
    }
}
