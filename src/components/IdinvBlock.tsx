import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { strings } from '../localization'
import { encodeIdinv } from '../helpers/encode'
import { width } from '../constants'

interface IdinvBlockProps {
    idinv: string
}

const COLOR_BLACK = '#000000'
const COLOR_GREY = '#00000011'

export const IdinvBlock: React.FunctionComponent<IdinvBlockProps> = ({
    idinv,
}) => {
    const [color, setColor] = useState(COLOR_GREY)
    const [sizeMultiplier, setSizeMultiplier] = useState(2.5)
    const [opacity, setOpacity] = useState(0.5)

    const handlePress = () => {
        if (color === COLOR_GREY) return setColor(COLOR_BLACK)
        else setSizeMultiplier(1.5)
        setOpacity(1)
    }

    if (!idinv) return null

    return (
        <View style={styles.container}>
            <Text>{`${strings.idinv}: ${idinv}`}</Text>
            <TouchableOpacity
                activeOpacity={opacity}
                style={{ padding: 30 }}
                onPress={handlePress}>
                <QRCode
                    color={color}
                    value={encodeIdinv(idinv)}
                    size={width / sizeMultiplier}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: '10%',
        width: '100%',
        alignItems: 'center',
    },
    information: {
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
    },
})
