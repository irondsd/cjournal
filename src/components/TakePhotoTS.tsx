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
import { NavigationParams } from 'react-navigation'

const popUpSize = Dimensions.get('window').width * 0.5

type TakePhotoProps = {
    value: string | undefined
    onChange: (value?: string) => void
    navigation: NavigationParams
    cameraScreen: string
    returnTo: string
}

export const TakePhoto: FC<TakePhotoProps> = ({
    value,
    onChange,
    navigation,
    cameraScreen,
    returnTo,
}) => {
    const [filename, setFilename] = useState<string>()
    const [image, setImage] = useState<string>()
    const [isShown, setIsShown] = useState<boolean>(false)

    const loadImage = async (path: string) => {
        if (!path) return

        const filename = path.split('/')[1]
        setFilename(filename)

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
        if (navigation.state.params.image)
            onChange(navigation.state.params.image)
    }, [navigation.state.params])

    useEffect(() => {
        if (value) loadImage(value)
    }, [value])

    return (
        <View style={styles.container}>
            {image ? (
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ flex: 1 }}
                    onLongPress={() => setIsShown(true)}
                    onPressOut={() => setIsShown(false)}>
                    <Text style={styles.text}>{filename}</Text>
                </TouchableOpacity>
            ) : (
                <Text
                    style={styles.placeholder}
                    onPress={() =>
                        navigation.navigate(cameraScreen, { returnTo })
                    }>
                    {strings.TakePhoto}
                </Text>
            )}
            <Icon
                style={styles.iconPhoto}
                name={'camera'}
                size={25}
                onPress={() => navigation.navigate(cameraScreen, { returnTo })}
                color={secondaryGrey}
            />
            <IconAnt
                style={styles.iconRemove}
                name="close"
                size={22.5}
                onPress={() => onChange()}
                color={placeholderGrey}
            />
            {isShown && (
                <View style={styles.popUp}>
                    <Image style={styles.img} source={{ uri: image }} />
                </View>
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
        paddingLeft: 45,
        paddingRight: 45,
        height: 50,
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
    },
    text: {
        fontSize: 17,
        top: 13,
        color: '#000',
    },
    placeholder: {
        flex: 1,
        top: 13,
        fontSize: 17,
        color: placeholderGrey,
    },
    iconPhoto: {
        position: 'absolute',
        left: 10,
        top: 12.5,
        height: 50,
        width: 30,
    },
    iconRemove: {
        position: 'absolute',
        right: 5,
        top: 14.5,
        height: 50,
        width: 30,
    },
    popUp: {
        position: 'absolute',
        top: '-300%',
        left: popUpSize * 0.4,
    },
    img: {
        flex: 1,
        backgroundColor: '#555',
        width: popUpSize,
        height: popUpSize * 0.7,
    },
})
