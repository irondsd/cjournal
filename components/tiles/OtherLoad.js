import React, { Component } from 'react'
import Tile from '../Tile'
import { strings } from '../../localization'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'

const name = activityTypes.OtherLoad
let clicked = false

export default class ScreenTile extends Component {
    render() {
        return (
            <Tile
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#303"
                onPress={() => {
                    this.props.navigation.navigate(paths.Other, {
                        sender: name,
                    })
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.Other, {
                        sender: name,
                    })
                }}
            />
        )
    }
}
