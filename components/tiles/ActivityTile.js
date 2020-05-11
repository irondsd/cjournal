import React, { Component } from 'react'
import Tile from '../Tile'
import { strings } from '../../localization'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'

const name = activityTypes.Activity

export default class ScreenTile extends Component {
    render() {
        return (
            <Tile
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#126835"
                shadeColor="#a55"
                disabled={this.props.disabled}
                onPress={() => {
                    this.props.navigation.navigate(paths.Activity)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.Activity)
                }}
            />
        )
    }
}
