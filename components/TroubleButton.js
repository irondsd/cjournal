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
import LinearGradient from 'react-native-linear-gradient'
var { Dimensions } = require('react-native')

export default class TroubleButton extends Component {
    render() {
        let propsStyles = StyleSheet.create({
            button: {
                backgroundColor: '#800',
                borderTopColor: pSBC(-0.1, '#800'),
                borderBottomColor: pSBC(-0.1, '#800'),
                borderLeftColor: pSBC(-0.1, '#800'),
                borderRightColor: pSBC(-0.1, '#800'),
            },
        })

        return (
            <TouchableOpacity
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
                <LinearGradient
                    style={[styles.button, propsStyles.button]}
                    colors={['#800', '#3C1518', '#800']}
                    useAngle={true}
                    angle={40}
                    // start={{ x: 0.0, y: 0.0 }}
                    // end={{ x: 0.5, y: 1.0 }}
                >
                    <Image
                        style={styles.img}
                        source={iconPicker(activity_types.Trouble)}
                    />
                    <Text style={styles.text}>{strings.Trouble}</Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

const tileSize = Dimensions.get('window').width / 3.75
const borderRadius = 10
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
