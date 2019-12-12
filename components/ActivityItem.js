import React, { Component } from 'react'
import { Platform, View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import { pSBC } from '../helpers/colors'

export default class ActivityItem extends Component {
    render() {
        let numberOfLines = 1
        if (this.props.text.length > 12) {
            numberOfLines = 2
        }
        let color = this.props.color
        imgSize = tileSize * 0.7 * this.props.imgScale

        if (numberOfLines > 1) {
            imgSize = imgSize * 0.8
        }

        let margin = styles.buttonActivity.width / 2 - styles.buttonActivity.borderBottomWidth - parseInt(imgSize / 2)
        if (this.props.disabled) color = pSBC(0.7, color)
        let propsStyles = StyleSheet.create({
            buttonActivity: {
                borderTopColor: pSBC(0.2, color),
                borderBottomColor: pSBC(-0.2, color),
                backgroundColor: color ? color : 'black',
                borderLeftColor: color ? color : 'black',
                borderRightColor: color ? color : 'black'
            },
            text: {
                height: tileSize / 5,
                fontSize: this.props.text.length > 10 ? 9 : 14
            },
            img: {
                height: imgSize ? imgSize : 70,
                width: imgSize ? imgSize : 70,
                top: margin ? margin : 14,
                left: margin ? margin : 14
            }
        })

        return (
            <TouchableOpacity
                style={[styles.buttonActivity, propsStyles.buttonActivity]}
                onLongPress={() => {
                    this.props.onLongPress()
                }}
                disabled={this.props.disabled}
                onPress={() => {
                    this.props.onPress()
                }}
            >
                <Image style={[styles.img, propsStyles.img]} source={this.props.img} />
                <Text adjustsFontSizeToFit numberOfLines={numberOfLines} style={[styles.text, propsStyles.text]}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        )
    }
}

const tileSize = Dimensions.get('window').width / 3.75
const borderRadius = tileSize / 4
const margin = Dimensions.get('window').width / 46.875
let imgSize = tileSize * 0.7
const imgMargin = (tileSize - imgSize) / 2

const styles = StyleSheet.create({
    buttonActivity: {
        width: tileSize,
        height: tileSize,
        justifyContent: 'flex-end',
        margin: margin,
        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderTopColor: 'black',
        borderBottomColor: 'black',
        backgroundColor: 'black',
        borderLeftColor: 'black',
        borderRightColor: 'black',
        borderStyle: 'solid',
        paddingLeft: 7,
        paddingRight: 7,
        paddingBottom: 2
    },
    text: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 14
    },
    img: {
        height: imgSize,
        width: imgSize,
        // top: 10,
        // left: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
        position: 'absolute'
    }
})
