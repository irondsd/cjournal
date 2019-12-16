import React, { Component } from 'react'
import {
    Platform,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native'
import { pSBC } from '../helpers/colors'
import { appColor, activity_types, paths } from '../properties'
import { strings } from '../localizations'
import { iconPicker } from '../helpers/iconPicker'
var { Dimensions } = require('react-native')

// TODO: add gradient

export default class TroubleButton extends Component {
    render() {
        let propsStyles = StyleSheet.create({
            button: {
                borderTopColor: pSBC(0.2, '#dd0000'),
                borderBottomColor: pSBC(-0.2, '#dd0000'),
                backgroundColor: '#dd0000',
                borderLeftColor: '#dd0000',
                borderRightColor: '#dd0000',
            },
        })

        return (
            <TouchableOpacity
                style={[styles.button, propsStyles.button]}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.Trouble, {
                        longPress: true,
                    })
                }}
                onPress={() => {
                    this.props.navigation.navigate(paths.Trouble, {
                        longPress: false,
                    })
                }}>
                <Image
                    style={styles.img}
                    source={iconPicker(activity_types.Trouble)}
                />
                <Text style={styles.text}>{strings.Trouble}</Text>
            </TouchableOpacity>
        )
    }
}

const tileSize = Dimensions.get('window').width / 3.75
const borderRadius = tileSize / 8
const margin = Dimensions.get('window').width / 46.875

const styles = StyleSheet.create({
    button: {
        width: tileSize * 3 + margin * 2 + 16,
        height: tileSize / 2,
        justifyContent: 'center',
        // margin: margin,
        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderTopColor: '#dd0000',
        borderBottomColor: '#dd0000',
        backgroundColor: '#dd0000',
        borderLeftColor: '#dd0000',
        borderRightColor: '#dd0000',
        borderStyle: 'solid',
        paddingLeft: 7,
        paddingRight: 7,
        paddingBottom: 2,
        marginBottom: 8,
        marginTop: 8,
        alignItems: 'center',
        flexDirection: 'row',
    },
    img: {
        height: 30,
        width: 30,
        margin: 10,
    },
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        // justifyContent: 'center',
        // flex: 1,
        alignItems: 'center',
    },
})
