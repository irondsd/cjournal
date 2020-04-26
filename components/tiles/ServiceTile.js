import React, { Component } from 'react'
import Tile from '../Tile'
import { strings } from '../../localizations'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'

const name = activityTypes.Service

export default class ScreenTile extends Component {
    render() {
        return (
            <Tile
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#000"
                shadeColor="#134756"
                disabled={this.props.disabled}
                onPress={() => {
                    this.props.navigation.navigate(paths.Service)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.Service)
                }}
            />
        )
    }
}
