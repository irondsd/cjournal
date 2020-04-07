import React, { Component } from 'react'
import Tile from '../Tile'
import { strings } from '../../localizations'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'

const name = activityTypes.Fatigue
let clicked = false

export default class ScreenTile extends Component {
    render() {
        return (
            <Tile
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#4c3f00"
                shadeColor="#842175"
                onPress={() => {
                    this.props.navigation.navigate(paths.Pain)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.Pain)
                }}
            />
        )
    }
}
