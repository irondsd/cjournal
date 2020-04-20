import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    PermissionsAndroid,
} from 'react-native'
import Sound from 'react-native-sound'
import AudioRecord from 'react-native-audio-record'
import Icon from 'react-native-vector-icons/FontAwesome'
import requestMicrophonePermissions from '../permissions/requestMicrophonePermissions'
var RNFS = require('react-native-fs')
import { borderGrey, secondaryGrey, secondaryColor } from '../constants'

const { width } = Dimensions.get('window')

export default class App extends Component {
    sound = null

    constructor(props) {
        super(props)
        this.state = {
            recording: false,
            loaded: false,
            paused: true,
            bars: [],
            audioFile: null,
        }

        this.play = this.play.bind(this)
        this.stop = this.stop.bind(this)
        this.record = this.record.bind(this)
        this.bars = this.bars.bind(this)
    }

    componentDidMount() {
        const options = {
            sampleRate: 12000,
            channels: 1,
            bitsPerSample: 14,
            wavFile: `audio${new Date().getTime()}.wav`,
        }

        AudioRecord.init(options)
    }

    componentDidUpdate() {
        if (this.props.link && !this.state.loaded) {
            this.linkLoad(this.props.link)
        }
    }

    componentWillUnmount() {
        this.stop()
        if (!this.state.paused) this.pause()
    }

    record = async () => {
        let permissions = await requestMicrophonePermissions()
        if (!permissions) return

        if (!this.state.recording) {
            this.setState({ bars: [] })
            this.timeoutId = setTimeout(async () => {
                this.stop()
            }, 10000)
            this.intervalId = setInterval(() => {
                this.setState({
                    bars: [...this.state.bars, Math.random() * (35 - 10) + 10],
                })
            }, 200)
            // console.log('start record')
            this.setState({
                recording: true,
                loaded: false,
            })
            AudioRecord.start()
        } else {
            this.stop()
        }
    }

    stop = async () => {
        clearInterval(this.intervalId)
        clearTimeout(this.timeoutId)
        if (!this.state.recording) return
        // console.log('stop record')
        let audioFile = await AudioRecord.stop()
        this.props.setAudio(audioFile)
        this.setState({ audioFile: audioFile })
        // console.log('audioFile', audioFile)
        this.setState({ recording: false })
    }

    linkLoad = link => {
        if (!this.state.loaded) {
            let audioFile =
                RNFS.DocumentDirectoryPath + '/' + link.split('/')[1]
            if (!this.state.audioFile) {
                this.setState(
                    {
                        audioFile: audioFile,
                    },
                    async () => await this.load(),
                )
            }
        }
    }

    load = () => {
        return new Promise((resolve, reject) => {
            if (!this.state.audioFile) {
                return reject('file path is empty')
            }
            this.sound = new Sound(this.state.audioFile, '', error => {
                if (error) {
                    console.log('failed to load the file', error)
                    return reject(error)
                }
                this.setState({ loaded: true })
                return resolve()
            })
        })
    }

    play = async () => {
        if (!this.state.loaded) {
            try {
                await this.load()
            } catch (error) {
                // console.log(error)
            }
        }
        if (this.state.paused) {
            this.setState({ paused: false })
            Sound.setCategory('Playback')
            this.sound.play(success => {
                if (success) {
                    // console.log('successfully finished playing')
                } else {
                    // console.log('playback failed due to audio decoding errors')
                }
                this.setState({ paused: true })
                // this.sound.release();
            })
        } else {
            this.sound.pause()
            this.setState({ paused: true })
        }
    }

    pause = () => {
        this.sound.pause()
        this.setState({ paused: true })
    }

    bars = () => {
        return this.state.bars.map((bar, index) => {
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.recorder}>
                    <TouchableOpacity
                        disabled={!this.state.audioFile}
                        activeOpacity={1}
                        style={
                            !this.state.audioFile
                                ? styles.buttonPlayDisabled
                                : styles.buttonPlay
                        }
                        onPress={() => this.play()}>
                        <Icon
                            name={this.state.paused ? 'play' : 'pause'}
                            size={20}
                            style={{ color: 'white' }}
                        />
                    </TouchableOpacity>
                    {this.bars()}
                    <TouchableOpacity
                        disabled={!this.state.paused}
                        activeOpacity={0.5}
                        style={
                            !this.state.paused
                                ? styles.buttonRecDisabled
                                : styles.buttonRec
                        }
                        onPress={() => this.record()}>
                        <Icon
                            name={this.state.recording ? 'stop' : 'microphone'}
                            size={20}
                            style={{ color: 'white' }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
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
