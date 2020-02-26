import React, { Component } from 'react'
import ActivityItem from '../ActivityItem'
import { strings } from '../../localizations'
import { activityInstantSave } from '../../helpers/activityInstantSave'
import { activityTypes, paths } from '../../constants'
import { iconPicker } from '../../helpers/iconPicker'

const name = activityTypes.Tests
let clicked = false

export default class Tile extends Component {
    render() {
        return (
            <ActivityItem
                text={strings[name]}
                img={iconPicker(name)}
                navigation={this.props.navigation}
                color="#6d1393"
                shadeColor="#a80c0c"
                disabled={this.props.disabled}
                imgScale={0.8}
                onPress={() => {
                    this.props.navigation.navigate(paths.Tests)
                }}
                onLongPress={() => {
                    this.props.navigation.navigate(paths.Tests)
                }}
            />
        )
    }
}
