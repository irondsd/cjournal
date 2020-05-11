import React, { Component } from 'react'
import Tile from '../Tile'
import { strings } from '../../localization'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'

const name = activityTypes.Pain

export default class ScreenTile extends Component {
    render() {
        return (
            <Tile
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#fc3f00"
                shadeColor="#000000"
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
