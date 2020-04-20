import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { strings } from '../localizations'
import IconAnt from 'react-native-vector-icons/dist/AntDesign'
const RNFS = require('react-native-fs')
import { borderGrey, secondaryGrey, placeholderGrey } from '../constants'

export default class TakePhoto extends Component {
    state = {
        name: '',
        popUp: false,
        link: null,
    }

    componentDidMount() {
        let name = this.props.photo
            ? this.props.photo.split('/').reduceRight(a => a)
            : ''

        if (this.props.link)
            name = this.props.link.split('/').reduceRight(a => a)

        this.setState({
            name: name,
        })

        if (this.props.photo) this.load(this.props.photo)
        if (this.props.link) this.link(this.props.link)
    }

    link(link) {
        let filename = link.split('/')[1]
        let filepath = RNFS.DocumentDirectoryPath + '/' + filename

        RNFS.exists(filepath).then(exists => {
            if (exists) this.load(filepath)
            // else console.log("doesn't exist")
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.photo !== nextProps.photo) {
            return {
                photo: nextProps.photo,
                name: nextProps.photo
                    ? nextProps.photo.split('/').reduceRight(a => a)
                    : '',
            }
        }

        // Return null to indicate no change to state.
        return null
    }

    openCamera = () => {
        this.props.openCamera()
    }

    removePhoto = () => {
        this.props.removePhoto()
    }

    async load(path) {
        if (path === undefined) return
        let base64image = await RNFS.readFile(path, 'base64')
        let link = `data:image/jpeg;base64,${base64image}`
        this.setState({ link: link }, () => {
            this.forceUpdate()
        })
    }

    showPhoto = () => {
        this.load(this.state.photo)
        this.setState({ popUp: true })
    }

    hidePhoto = () => {
        this.setState({ popUp: false })
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.photo || this.props.link ? (
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{ flex: 1 }}
                        onLongPress={this.showPhoto}
                        onPressOut={this.hidePhoto}>
                        <Text style={styles.text}>{this.state.name}</Text>
                    </TouchableOpacity>
                ) : (
                    <Text style={styles.placeholder} onPress={this.openCamera}>
                        {strings.TakePhoto}
                    </Text>
                )}
                <Icon
                    style={styles.iconPhoto}
                    name={'camera'}
                    size={25}
                    onPress={this.openCamera}
                    color={secondaryGrey}
                />
                <IconAnt
                    style={styles.iconRemove}
                    name="close"
                    size={22.5}
                    onPress={this.removePhoto}
                    color={placeholderGrey}
                />
                {this.state.popUp && (
                    <View style={styles.popUp}>
                        <Image
                            style={styles.img}
                            source={{ uri: this.state.link }}
                        />
                    </View>
                )}
            </View>
        )
    }
}

popUpSize = Dimensions.get('window').width * 0.5

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
        fontSize: 17,
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
        // width: popUpSize,
        // height: popUpSize * 0.6,
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
