import React, { Component } from 'react'
import {
    Platform,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import { pSBC } from '../helpers/colors'
import LinearGradient from 'react-native-linear-gradient'

export default class ActivityItem extends Component {
    render() {
        let marginTop =
            (Dimensions.get('window').height -
                70 -
                64 -
                10 -
                20 -
                tileSize / 2 -
                tileSize * 4) /
            5
        let text = this.props.text || 'Undefined'
        if (Dimensions.get('window').width / 20 < marginTop)
            marginTop = Dimensions.get('window').width / 20

        let shadeColor = '#000000dd'
        if (this.props.shadeColor) shadeColor = this.props.shadeColor
        let numberOfLines = 1
        if (text.length > 14) {
            numberOfLines = 2
        }
        let color = this.props.color
        let imgSize = tileSize * 0.7 * this.props.imgScale

        if (numberOfLines > 1) {
            imgSize = imgSize * 0.8
        }

        let margin =
            styles.buttonActivity.height / 2 -
            styles.buttonActivity.borderWidth -
            parseInt(imgSize / 2)
        let marginLeft =
            styles.buttonActivity.width / 2 -
            styles.buttonActivity.borderWidth -
            parseInt(imgSize / 2)
        if (this.props.disabled) color = pSBC(0.7, color)
        let propsStyles = {
            text: {
                height: tileSize / (numberOfLines === 1 ? 5 : 4),
                fontSize:
                    Platform.OS === 'android'
                        ? text.length > 14
                            ? 9
                            : 14
                        : null,
            },
            img: {
                height: imgSize ? imgSize : 70,
                width: imgSize ? imgSize : 70,
                top: margin ? margin : 14,
                left: marginLeft ? marginLeft : 14,
            },
            buttonActivity: {
                backgroundColor: this.props.color,
                marginTop: marginTop,
                marginBottom: 0,
            },
        }
        let mainColor = this.props.color
        shadeColor = pSBC(-0.5, this.props.color, shadeColor)

        if (this.props.disabled) {
            mainColor = '#aaa'
            shadeColor = '#aaa'
        }

        return (
            <TouchableOpacity
                onLongPress={() => {
                    this.props.onLongPress()
                }}
                disabled={this.props.disabled}
                onPress={() => {
                    this.props.onPress()
                }}>
                <LinearGradient
                    style={[styles.buttonActivity, propsStyles.buttonActivity]}
                    colors={[mainColor, shadeColor]}
                    start={{ x: 0.0, y: 0.0 }}
                    end={{ x: 1.0, y: 1.0 }}>
                    <Image
                        style={[styles.img, propsStyles.img]}
                        source={this.props.img}
                    />
                    <Text
                        adjustsFontSizeToFit
                        numberOfLines={numberOfLines}
                        style={[styles.text, propsStyles.text]}>
                        {this.props.text}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

const tileSize = Dimensions.get('window').width / 3.75
const borderRadius = tileSize / 6
const margin = Dimensions.get('window').width / 46.875
let imgSize = tileSize * 0.7
const imgMargin = (tileSize - imgSize) / 2

const styles = StyleSheet.create({
    buttonActivity: {
        width: tileSize * 1.56,
        margin: margin,
        height: tileSize,
        justifyContent: 'flex-end',
        borderRadius: borderRadius,
        borderWidth: 2,
        borderColor: '#00000015',
        borderStyle: 'solid',
        paddingLeft: 5,
        paddingRight: 5,
    },
    text: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 14,
    },
    img: {
        height: imgSize,
        width: imgSize,
        position: 'absolute',
    },
})
