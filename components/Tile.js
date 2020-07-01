import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native'
import {
    tileMargin,
    imgSize,
    borderRadius,
    tileSize,
    tileFontSize,
} from '../constants/styles'
import { pSBC } from '../helpers/colors'
import LinearGradient from 'react-native-linear-gradient'
import { showToast, showError } from '../services/toast'
import { strings } from '../localization'
import ActivityIcon from './ActivityIcon'

export default class aTile extends Component {
    static defaultProps = {
        shadeColor: '#000',
    }

    constructor(props) {
        super(props)

        this.clicked = false
    }

    onPressMethod = () => {
        if (!this.clicked) {
            this.clicked = true
            if (!this.props.disabled) {
                this.props.onPress()
            } else {
                showError(strings.OverlapMsg)
            }

            setTimeout(() => {
                this.clicked = false
            }, 1000)
        }
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
                    this.onPressMethod()
                }}>
                <LinearGradient
                    style={styles.box}
                    colors={[this.props.color, this.props.shadeColor]}
                    start={{ x: 0.0, y: 1.0 }}
                    end={{ x: 1.0, y: 0.0 }}>
                    <ActivityIcon icon={this.props.img} />
                </LinearGradient>
                <View style={styles.titleBox}>
                    <Text adjustsFontSizeToFit style={styles.text}>
                        {this.props.text}
                    </Text>
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
        top: Platform.OS === 'ios' ? 0 : -3,
        height: tileMargin * 4.5,
    },
    text: {
        color: 'black',
        fontSize: tileFontSize,
        fontWeight: '400',
        textAlign: 'center',
    },
})
