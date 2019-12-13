import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    StatusBar,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import { logoutUser } from '../redux/actions/userActions'
import { backgroundColor } from '../properties'
import { strings } from '../localizations'

class SettingsScreen extends Component {
    logout() {
        // TODO: change
        AsyncStorage.removeItem('user')
        AsyncStorage.removeItem('activity')
        AsyncStorage.removeItem('tasks')
        AsyncStorage.removeItem('notifications')
        AsyncStorage.removeItem('screens')
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
                <Text style={styles.name}>{this.props.user.name}</Text>
                <Text style={styles.email}>{this.props.user.email}</Text>
                <Text style={styles.information}>
                    {this.props.user.gender}, {this.props.user.birthday}
                </Text>
                <Button
                    title={strings.Logout}
                    style={styles.button}
                    onPress={() => {
                        this.logout()
                    }}
                />
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
})
