import React, { Component } from 'react'
import Tile from '../Tile'
import { strings } from '../../localizations'
import { activityInstantSave } from '../../helpers/activityInstantSave'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'

const name = activityTypes.VerticalPositionCalibration
let clicked = false

export default class ScreenTile extends Component {
    render() {
        return (
            <Tile
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#002b22"
                onPress={() => {
                    this.props.navigation.navigate(
                        paths.VerticalPositionCalibration,
                        {
                            sender: name,
                        },
                    )
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(
                        paths.VerticalPositionCalibration,
                        {
                            sender: name,
                        },
                    )
                }}
            />
        )
    }
}
