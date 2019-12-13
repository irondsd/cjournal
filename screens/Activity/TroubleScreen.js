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

type Props = {}
class TroubleScreen extends Component<Props> {
    static navigationOptions = {
        title: strings.Trouble,
        headerLeft: null,
    }

    constructor(props) {
        super(props)

        this.state = {
            longPress: false,
            comment: '',
            position: false,
            audioFile: null,
        }

        this.setAudio = this.setAudio.bind(this)
        this.requestPosition = this.requestPosition.bind(this)
    }

    record() {
        let activity = Activity.instantInit(
            activity_types.Trouble,
            this.state.comment,
            {
                position: this.state.position,
            },
        )
        if (this.state.audioFile) activity.data.audioFile = this.state.audioFile

        this.props.add(activity)

        this.props.navigation.navigate(paths.Home)
    }

    requestPosition(enableHighAccuracy = false) {
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log('Got position', position.coords)
                // record here
                this.setState(
                    {
                        position: position.coords,
                    },
                    () => {
                        if (!this.state.longPress) this.record()
                    },
                )
            },
            error => console.log(error.message),
            {
                enableHighAccuracy: enableHighAccuracy,
                timeout: 30000,
                maximumAge: 30000,
            },
        )
    }

    async requestLocationPermissions() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Cardio Tracker',
                    message:
                        'We need your location to better calculate the distance.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the location')
                this.requestPosition(false)
                this.requestPosition(true) // first requesting by wifi, then by GPS
            } else {
                console.log('Location permission denied')
            }
        } catch (err) {
            console.warn(err)
        }
    }

    componentDidMount() {
        this.requestLocationPermissions()
        this.setState({
            longPress: this.props.navigation.state.params.longPress,
        })
    }

    componentWillUnmount() {
        navigator.geolocation.stopObserving()
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
                    {this.state.position != false
                        ? strings.FoundLocation
                        : strings.Locating}
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

export default connect(mapStateToProps, mapDispatchToProps)(TroubleScreen)

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
