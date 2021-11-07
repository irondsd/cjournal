import React, { FC, useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Sound from 'react-native-sound'
import AudioRecord from 'react-native-audio-record'
import Icon from 'react-native-vector-icons/FontAwesome'
import requestMicrophonePermissions from '../permissions/requestMicrophonePermissions'
var RNFS = require('react-native-fs')
import { borderGrey, secondaryGrey, secondaryColor } from '../constants'

type AudioRecorderProps = {
    onChange: (file: string) => void
    file?: string
}

export const AudioRecorder: FC<AudioRecorderProps> = ({ onChange, file }) => {
    const [audioFile, setAudioFile] = useState<string>()
    const [recording, setRecording] = useState<boolean>(false)
    const [paused, setPaused] = useState<boolean>(true)
    const [loaded, setLoaded] = useState<boolean>(false)
    const [bars, setBars] = useState<number[]>([])
    const [sound, setSound] = useState<Sound>()
    const [timeoutId, setTimeoutId] = useState<number>()
    const [intervalId, setIntervalId] = useState<number>()

    const audioRecordInit = () => {
        const options = {
            sampleRate: 12000,
            channels: 1,
            bitsPerSample: 14,
            wavFile: `audio${new Date().getTime()}.wav`,
        }

        AudioRecord.init(options)
    }

    const stopRecord = async () => {
        clearInterval(intervalId)
        clearTimeout(timeoutId)
        const audioFile = await AudioRecord.stop()
        console.log('stop record')
        onChange(audioFile)
        setAudioFile(audioFile)
        console.log('audioFile', audioFile)
        setRecording(false)
    }

    const startRecord = async () => {
        let permissions = await requestMicrophonePermissions()
        if (!permissions) return

        audioRecordInit()

        if (!recording) {
            setBars([])
            const intervalId = setInterval(() => {
                const min = 10
                const max = 35
                const newBar = Math.floor(Math.random() * (max - min + 1)) + min

                setBars(bars => [...bars, newBar])
            }, 200)
            const timeoutId = setTimeout(async () => {
                clearInterval(intervalId)
                clearTimeout(timeoutId)
                const audioFile = await AudioRecord.stop()
                console.log('stop record')
                onChange(audioFile)
                setAudioFile(audioFile)
                console.log('audioFile', audioFile)
                setRecording(false)
            }, 10000)
            setTimeoutId(timeoutId)
            setIntervalId(intervalId)

            console.log('start record')
            setRecording(true)
            setLoaded(false)
            AudioRecord.start()
        } else {
            stopRecord()
        }
    }

    const loadUrl = (url: string) => {
        if (!loaded) {
            let audioFile = RNFS.DocumentDirectoryPath + '/' + url.split('/')[1]
            if (!audioFile) setAudioFile(audioFile)
        }
    }

    const loadFile = (file: string): Promise<Sound> => {
        return new Promise((resolve, reject) => {
            if (!file) {
                return reject(new Error('no audio file'))
            }
            const sound: any = new Sound(file, '', error => {
                if (error) {
                    console.log('failed to load the file', error)
                    return reject(error)
                }
                setLoaded(true)
                return resolve(sound)
            })
            setSound(sound)
        })
    }

    const playPause = async () => {
        if (!loaded && audioFile) {
            try {
                await loadFile(audioFile)
            } catch (error) {
                console.log(error)
            }
        }
        if (paused && sound) {
            setPaused(false)
            Sound.setCategory('Playback')
            sound.play(success => {
                if (success) {
                    console.log('successfully finished playing')
                } else {
                    console.log('playback failed due to audio decoding errors')
                }
                setPaused(true)
                // sound.release()
            })
        } else {
            if (sound) sound.pause()
            setPaused(true)
        }
    }

    const renderBars = () => {
        return bars.map((bar, index) => {
            return (
                <View
                    key={index}
                    style={{
                        height: bar,
                        width: '1%',
                        margin: 0.5,
                        backgroundColor: secondaryGrey,
                    }}
                />
            )
        })
    }

    useEffect(() => {
        if (file) loadUrl(file)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.recorder}>
                <TouchableOpacity
                    disabled={!audioFile}
                    activeOpacity={1}
                    style={
                        !audioFile
                            ? styles.buttonPlayDisabled
                            : styles.buttonPlay
                    }
                    onPress={() => playPause()}>
                    <Icon
                        name={paused ? 'play' : 'pause'}
                        size={20}
                        style={{ color: 'white' }}
                    />
                </TouchableOpacity>
                {renderBars()}
                <TouchableOpacity
                    disabled={!paused}
                    activeOpacity={0.5}
                    style={
                        !paused ? styles.buttonRecDisabled : styles.buttonRec
                    }
                    onPress={() => startRecord()}>
                    <Icon
                        name={recording ? 'stop' : 'microphone'}
                        size={20}
                        style={{ color: 'white' }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },
    recorder: {
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: borderGrey,
        paddingLeft: 55,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 55,
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    buttonPlay: {
        backgroundColor: secondaryColor,
        height: 40,
        width: 40,
        justifyContent: 'center',
        position: 'absolute',
        alignItems: 'center',
        borderRadius: 5,
        // marginRight: 5,
        left: 5,
        top: 5,
    },
    buttonRec: {
        height: 40,
        width: 40,
        backgroundColor: secondaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        position: 'absolute',
        right: 5,
        top: 5,
    },
    buttonRecDisabled: {
        height: 40,
        width: 40,
        backgroundColor: borderGrey,
        justifyContent: 'center',
        position: 'absolute',
        alignItems: 'center',
        borderRadius: 5,
        // marginRight: 5,
        right: 5,
        top: 5,
    },
    buttonPlayDisabled: {
        backgroundColor: borderGrey,
        height: 40,
        width: 40,
        justifyContent: 'center',
        position: 'absolute',
        alignItems: 'center',
        borderRadius: 5,
        // marginRight: 5,
        left: 5,
        top: 5,
    },
})
