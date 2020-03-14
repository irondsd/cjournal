import React, { Component } from 'react'
import Tile from '../Tile'
import { strings } from '../../localizations'
import { activitySaveWithLocation } from '../../helpers/activitySaveWithLocation'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'

const name = activityTypes.Alarm
let clicked = false

export default class ScreenTile extends Component {
    render() {
        return (
            <Tile
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#a00"
                shadeColor="#000"
                onPress={() => {
                    activitySaveWithLocation(name)
                    this.props.navigation.navigate(paths.Home)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.Alarm, {
                        longPress: true,
                    })
                }}
            />
        )
    }
}
