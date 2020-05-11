import React, { Component } from 'react'
import Tile from '../Tile'
import { strings } from '../../localization'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'

const name = activityTypes.EmotionalStress

export default class ScreenTile extends Component {
    render() {
        return (
            <Tile
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#113"
                shadeColor="#434756"
                onPress={() => {
                    this.props.navigation.navigate(paths.EmotionalStress)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.EmotionalStress)
                }}
            />
        )
    }
}
