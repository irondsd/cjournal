import React, { Component } from 'react'
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import { strings } from '../localizations'
import { backgroundColor, backendUrl } from '../properties'
import Icon from 'react-native-vector-icons/FontAwesome'
const RNFS = require('react-native-fs')

let base64image = null
export default class Photo extends Component {
    state = { link: null }

    async load(path) {
        let base64image = await RNFS.readFile(path, 'base64')
        let link = `data:image/jpeg;base64,${base64image}`

        this.setState({ link: link }, () => {
            this.forceUpdate()
        })
    }

    link(link) {
        // this.setState({
        //     link: backendUrl + this.props.link,
        // })

        let filename = link.split('/')[1]
        let filepath = RNFS.DocumentDirectoryPath + '/' + filename

        RNFS.exists(filepath).then(exists => {
            if (exists) this.load(filepath)
            else console.log("doesn't exist")
        })
    }

    componentDidMount() {
        if (this.props.photo) this.load(this.props.photo)
        if (this.props.link) this.link(this.props.link)
    }

    // componentWillReceiveProps(nextProps) {
    //     if (this.props.link) this.link(this.props.link)
    // }
    // TODO: check
    componentDidUpdate() {
        if (this.props.link) this.link(this.props.link)
    }

    componentDidUpdate() {
        if (this.props.photo) this.load(this.props.photo)
    }

    remove() {
        this.props.remove()
    }

    render() {
        if (this.props.photo || this.props.link)
            return (
                <View style={styles.photo}>
                    <Image
                        style={styles.img}
                        source={{ uri: this.state.link }}
                    />
                    <Icon
                        name="times"
                        color="#000"
                        size={20}
                        style={styles.del}
                        onPress={() => {
                            this.remove()
                        }}
                    />
                </View>
            )
        else return null
    }
}

const styles = StyleSheet.create({
    photo: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    img: {
        borderColor: '#DDD',
        borderWidth: 1,
        height: 200,
        width: 200,
    },
    del: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 20,
        height: 20,
    },
})
