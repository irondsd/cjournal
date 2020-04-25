import React, { Component } from 'react'
import Tile from '../Tile'
import { strings } from '../../localizations'
import Activity from '../../classes/Activity'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'

const name = activityTypes.VisionDisturbances
let clicked = false

export default class ScreenTile extends Component {
    render() {
        return (
            <Tile
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#3a2747"
                shadeColor="#993"
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
