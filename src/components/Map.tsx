import React, { FC } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { borderGrey } from '../constants'

type MapProps = {
    latitude: number
    longitude: number
}

export const Map: FC<MapProps> = ({ latitude, longitude }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.tinyLogo}
                source={{
                    uri: 'https://geospatialmedia.s3.amazonaws.com/wp-content/uploads/2019/07/Apple-maps-app.png',
                }}
            />
            <Text
                style={
                    styles.text
                }>{`No map available\nlatitude: ${latitude}\nlongitude: ${longitude}`}</Text>
        </View>
    )
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
