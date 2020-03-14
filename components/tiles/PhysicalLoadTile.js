import React, { Component } from 'react'
import Tile from '../Tile'
import { strings } from '../../localizations'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'

const name = activityTypes.PhysicalLoad
let clicked = false

export default class ScreenTile extends Component {
    render() {
        return (
            <Tile
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#2d1a5b"
                shadeColor="#600"
                imgScale={0.95}
                disabled={this.props.disabled}
                onPress={() => {
                    this.props.navigation.navigate(paths.PhysicalLoad)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.PhysicalLoad)
                }}
            />
        )
    }
}
