import React, { Component } from 'react'
import Tile from '../Tile'
import { strings } from '../../localizations'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'
import Activity from '../../classes/Activity'

const name = activityTypes.Workout

export default class ScreenTile extends Component {
    render() {
        return (
            <Tile
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#343d4c"
                onPress={() => {
                    Activity.instantInitSave(
                        name,
                        this.props.navigation.navigate,
                    )
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
