import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
// import MapView from 'react-native-maps'
import { borderGrey } from '../constants'

export default class Map extends Component {
    state = {
        latitude: '',
        longitude: '',
    }

    componentDidMount() {
        this.setCoords()
    }

    componentDidUpdate() {
        if (!this.state.latitude) {
            this.setCoords()
        }
    }

    setCoords = () => {
        if (this.props.coords[0]) {
            this.setState({
                latitude: this.props.coords[0].latitude,
                longitude: this.props.coords[0].longitude,
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.tinyLogo}
                    ImageResizeMode={'center'}
                    source={{
                        uri:
                            'https://geospatialmedia.s3.amazonaws.com/wp-content/uploads/2019/07/Apple-maps-app.png',
                    }}
                />
                <Text style={styles.text}>{`No map available\nlatitude: ${
                    this.state.latitude
                }\nlongitude: ${this.state.longitude}`}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: borderGrey,
        // paddingLeft: 15,
        // paddingRight: 15,
        height: 250,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    text: {
        textAlign: 'center',
        fontSize: 25,
        top: 13,
        color: 'black',
    },
    tinyLogo: {
        position: 'absolute',
        width: '100%',
        height: 250,
    },
})
