import React, { Component } from 'react'
import Tile from '../Tile'
import { strings } from '../../localizations'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'

const name = activityTypes.TakingMedicine
let clicked = false

export default class ScreenTile extends Component {
    render() {
        return (
            <Tile
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#246591"
                disabled={this.props.disabled}
                shadeColor="#f55"
                onPress={() => {
                    this.props.navigation.navigate(paths.TakingMedicine)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.TakingMedicine)
                }}
            />
        )
    }
}
