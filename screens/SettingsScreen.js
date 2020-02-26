import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    StatusBar,
    Linking,
} from 'react-native'
import { connect } from 'react-redux'
import { logoutUser } from '../redux/actions/userActions'
import { backgroundColor, profileEditUrl } from '../constants'
import { strings } from '../localizations'
import TouchableIcon from '../components/TouchableIcon'

class SettingsScreen extends Component {
    static navigationOptions = {
        title: strings.Settings,
        headerRight: (
            <TouchableIcon
                name="qrcode"
                color="#000"
                size={25}
                style={{ right: 15 }}
            />
        ),
    }

    logout() {
        this.props.logout()
        this.props.navigation.navigate('Auth')
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={'white'}
                    barStyle="dark-content"
                    // hidden={true}
                />
                <Text style={styles.name}>{this.props.user.username}</Text>
                <Text
                    style={
                        styles.information
                    }>{`${strings.idinv}: ${this.props.user.idinv}`}</Text>
                <View style={styles.buttonView}>
                    <Button
                        title={strings.EditProfile}
                        style={styles.button}
                        onPress={() => {
                            Linking.openURL(profileEditUrl).catch(err =>
                                console.error('An error occurred', err),
                            )
                        }}
                    />
                    <Button
                        title={strings.Logout}
                        style={styles.button}
                        onPress={() => {
                            this.logout()
                        }}
                    />
                </View>
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
    logout: () => {
        dispatch(logoutUser())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
    },
    name: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    email: {
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
    },
    information: {
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        margin: 10,
        padding: 20,
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
    },
})
