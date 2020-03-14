import React, { Component } from 'react'
import Tile from '../Tile'
import { strings } from '../../localizations'
import { activityInstantSave } from '../../helpers/activityInstantSave'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'

const name = activityTypes.Stairs

export default class ScreenTile extends Component {
    render() {
        return (
            <Tile
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#4E342E"
                onPress={() => {
                    this.props.navigation.navigate(paths.Stairs)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.Stairs)
                }}
            />
        )
    }
}
