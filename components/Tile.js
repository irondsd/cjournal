import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import {
    tileMargin,
    imgSize,
    borderRadius,
    tileSize,
} from '../constants/styles'
import { pSBC } from '../helpers/colors'
import LinearGradient from 'react-native-linear-gradient'
import { showToast, showError } from '../services/toast'
import { strings } from '../localizations'

export default class aTile extends Component {
    static defaultProps = {
        shadeColor: '#000',
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.container}
                onLongPress={() => {
                    if (!this.props.disabled) {
                        this.props.onLongPress()
                    } else {
                        showError(strings.OverlapMsg)
                    }
                }}
                onPress={() => {
                    if (!this.props.disabled) {
                        this.props.onPress()
                    } else {
                        showError(strings.OverlapMsg)
                    }
                }}>
                <LinearGradient
                    style={styles.box}
                    colors={[this.props.color, this.props.shadeColor]}
                    start={{ x: 0.0, y: 0.0 }}
                    end={{ x: 1.0, y: 1.0 }}>
                    <Image style={styles.img} source={this.props.img} />
                </LinearGradient>
                <View style={styles.titleBox}>
                    <Text style={styles.text}>{this.props.text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: tileSize,
        marginLeft: tileMargin,
        marginRight: tileMargin,
    },
    box: {
        height: tileSize,
        backgroundColor: '#666',
        borderRadius: borderRadius,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: imgSize,
        height: imgSize,
    },
    titleBox: {
        top: -3,
        height: tileMargin * 4.5,
    },
    text: {
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
    },
})
