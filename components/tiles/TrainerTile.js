import React, { Component } from 'react'
import Tile from '../Tile'
import { strings } from '../../localizations'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'
import { activityInstantSave } from '../../helpers/activityInstantSave'

const name = activityTypes.Trainer

export default class ScreenTile extends Component {
    render() {
        return (
            <Tile
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#512DA8"
                onPress={() => {
                    this.props.navigation.navigate(paths.Trainer)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.Trainer)
                }}
            />
        )
    }
}
