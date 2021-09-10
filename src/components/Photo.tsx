import React, { FC, useState, useEffect } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { strings } from '../localization'
import IconAnt from 'react-native-vector-icons/AntDesign'
import RNFS from 'react-native-fs'
import { borderGrey, secondaryGrey, placeholderGrey } from '../constants'

type PhotoProps = {
    value: string | undefined
    onChange: (value?: string) => void
    openCamera: () => void
}

export const Photo: FC<PhotoProps> = ({ value, onChange, openCamera }) => {
    const [image, setImage] = useState<string | undefined>()

    const loadImage = async (path: string) => {
        if (!path) return

        const filename = path.split('/')[1]

        RNFS.exists(path).then((exists: boolean) => {
            if (exists) {
                RNFS.readFile(path, 'base64').then((base64image: string) => {
                    const link = `data:image/jpeg;base64,${base64image}`
                    setImage(link)
                })
            } else console.log("doesn't exist")
        })
    }

    useEffect(() => {
        if (value) loadImage(value)
        else setImage(undefined)
    }, [value])

    return (
        <View style={{ ...styles.container, height: image ? 100 : 50 }}>
            <Icon
                style={styles.iconPhoto}
                name={'camera'}
                size={25}
                onPress={openCamera}
                color={secondaryGrey}
            />
            {image ? (
                <>
                    <View style={styles.imageContainer}>
                        <Image style={styles.img} source={{ uri: image }} />
                    </View>
                    <IconAnt
                        style={styles.iconRemove}
                        name="close"
                        size={22.5}
                        onPress={() => onChange()}
                        color={placeholderGrey}
                    />
                </>
            ) : (
                <Text style={styles.placeholder} onPress={openCamera}>
                    {strings.TakePhoto}
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: borderGrey,
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    text: {
        fontSize: 17,
        top: 13,
        color: '#000',
    },
    placeholder: {
        flex: 1,
        fontSize: 17,
        left: -20,
        textAlign: 'center',
        color: placeholderGrey,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
    },
    iconPhoto: {
        margin: 10,
    },
    iconRemove: {
        margin: 10,
    },
    img: {
        width: 90,
        height: 90,
    },
})
