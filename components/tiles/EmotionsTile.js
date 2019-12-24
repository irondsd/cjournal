import React, { Component } from 'react'
import ActivityItem from '../ActivityItem'
import { strings } from '../../localizations'
import { activity_types, paths } from '../../properties'
import { iconPicker } from '../../helpers/iconPicker'

const name = activity_types.Emotions
let clicked = false

export default class Tile extends Component {
    render() {
        return (
            <ActivityItem
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#134756"
                shadeColor="#32a4a8"
                imgScale={0.9}
                onPress={() => {
                    this.props.navigation.navigate(paths.Emotions)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.Emotions)
                }}
            />
        )
    }
}
