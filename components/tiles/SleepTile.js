import React, { Component } from 'react'
import ActivityLargeItem from '../ActivityLargeItem'
import { strings } from '../../localizations'
import { activity_types, paths } from '../../properties'
import { iconPicker } from '../../helpers/iconPicker'

const name = activity_types.Sleep

export default class Tile extends Component {
    render() {
        return (
            <ActivityLargeItem
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#330"
                shadeColor="#000"
                imgScale={0.8}
                onPress={() => {
                    this.props.navigation.navigate(paths.Sleep)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.TimePick, {
                        sender: name,
                    })
                }}
            />
        )
    }
}
