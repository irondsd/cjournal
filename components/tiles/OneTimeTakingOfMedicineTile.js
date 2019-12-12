import React, { Component } from 'react'
import ActivityItem from '../../ActivityItem'
import { strings } from '../../../localizations'
import { activity_types, paths } from '../../../properties'
import { iconPicker } from '../../../helpers/iconPicker'

const name = activity_types.OneTimeTakingOfMedicine
let clicked = false

export default class Tile extends Component {
    render() {
        return (
            <ActivityItem
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color='#444'
                imgScale={0.95}
                onPress={() => {
                    this.props.navigation.navigate(paths.Pills, { sender: name })
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.Pills, { sender: name })
                }}
            />
        )
    }
}
