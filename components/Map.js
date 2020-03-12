import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
// import MapView from 'react-native-maps'
import { borderGrey } from '../constants'

export default class maps extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{`${this.props.coords}`}</Text>
                {/* <MapView
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                /> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: borderGrey,
        paddingLeft: 15,
        paddingRight: 15,
        height: 250,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 17,
        top: 13,
    },
})
