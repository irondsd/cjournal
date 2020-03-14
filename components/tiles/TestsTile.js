import React, { Component } from 'react'
import Tile from '../Tile'
import { strings } from '../../localizations'
import { activityInstantSave } from '../../helpers/activityInstantSave'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'

const name = activityTypes.Tests
let clicked = false

export default class ScreenTile extends Component {
    render() {
        return (
            <Tile
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#8B55B2"
                shadeColor="#000"
                disabled={this.props.disabled}
                imgScale={0.8}
                onPress={() => {
                    this.props.navigation.navigate(paths.Tests)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.Tests)
                }}
            />
        )
    }
}
