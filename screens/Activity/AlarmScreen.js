import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    PermissionsAndroid,
    TextInput,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import { backgroundColor, paths, activity_types } from '../../properties'
import { strings } from '../../localizations'
import { addActivity } from '../../redux/actions'
import AudioRecorder from '../../components/AudioRecorder'
import Activity from '../../classes/Activity'
import timestamp from '../../helpers/timestamp'
import GPS from '../../sensors/GPS'

// TODO: Fix location not found exeption

class AlarmScreen extends Component {
    static navigationOptions = {
        title: strings.Alarm,
        headerLeft: null,
    }

    constructor(props) {
        super(props)

        this.state = {
            longPress: false,
            comment: '',
            position: {},
            audioFile: null,
            locationPermission: false,
        }

        this.setAudio = this.setAudio.bind(this)
        this.startUpdates = this.startUpdates.bind(this)
        this.GPS = new GPS()
    }

    record() {
        let activity = Activity.instantInit(
            activity_types.Alarm,
            this.state.comment,
            {
                position: this.state.position,
            },
        )
        if (this.state.audioFile) activity.data.audioFile = this.state.audioFile

        this.props.add(activity)
        this.props.navigation.navigate(paths.Home)
    }

    componentDidMount() {
        this.setState({
            longPress: this.props.navigation.state.params.longPress,
        })

        if (this.props.navigation.state.params.longPress) {
            this.startUpdates()
        } else {
            this.GPS.getPosition().then(position => {
                this.setState({ position: position }, () => {
                    this.record()
                })
            })
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    startUpdates() {
        this.intervalId = setInterval(() => {
            this.GPS.getPosition()
                .then(position => {
                    this.setState({ position: position }, () => {
                        this.record()
                    })
                })
                .catch(() => this.startUpdates())
        }, 3000)
    }

    setAudio(audioFile) {
        this.setState({
            audioFile: audioFile,
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {Object.entries(this.state.position).length === 0 &&
                    this.state.position.constructor === Object
                        ? strings.Locating
                        : strings.FoundLocation}
                </Text>
                {this.state.longPress ? (
                    <TextInput
                        placeholder={strings.Comment}
                        multiline={true}
                        maxLength={80}
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={true}
                        returnKeyType="next"
                        onChangeText={text => {
                            this.setState({
                                comment: text,
                            })
                        }}
                        value={this.state.comment}
                    />
                ) : null}
                {this.state.longPress ? (
                    <View>
                        <AudioRecorder
                            audioFile={this.state.audioFile}
                            setAudio={this.setAudio}
                        />
                        <Button
                            style={styles.button}
                            title={strings.Save}
                            onPress={() => {
                                this.record.bind(this)
                                this.record()
                            }}
                        />
                    </View>
                ) : null}
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => ({
    add: activity => {
        dispatch(addActivity(activity))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(AlarmScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
    },
    text: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        flex: 2,
        margin: 20,
        justifyContent: 'flex-end',
    },
    input: {
        fontSize: 20,
        backgroundColor: 'whitesmoke',
        color: 'black',
        padding: 10,
    },
})
