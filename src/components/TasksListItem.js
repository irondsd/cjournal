import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native'
import { displayDateTime } from '../helpers/dateTime'
import { strings } from '../localization'
import {
    paths,
    activityTypes,
    pillsList,
    othersList,
    activityPaths,
} from '../constants'
import ListItem from './ListItem'

export default class TasksListItem extends Component {
    time() {
        return displayDateTime(new Date(this.props.item.time * 1000))
    }

    data() {
        let data = null

        if (this.props.item.data) {
            if (this.props.item.data.pill) {
                data = this.props.item.data.pill
            }
        }

        return data
    }

    onPress() {
        if (this.props.item.completed) return

        let navigateTo = activityPaths[this.props.item.activity_type]

        this.props.navigation.navigate(navigateTo, {
            task: this.props.item._id,
            sender: this.props.item.activity_type,
        })
    }

    render() {
        return (
            <ListItem
                activity_type={this.props.item.activity_type}
                time={this.time()}
                data={this.data()}
                onPress={() => this.onPress()}
                disabled={this.props.item.completed}
            />
        )
    }
}