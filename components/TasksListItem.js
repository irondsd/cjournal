import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native'
import { displayDateTime } from '../helpers/dateTime'
import { strings } from '../localizations'
import { iconPicker } from '../helpers/iconPicker'
import { paths, activityTypes, pillsList, othersList } from '../constants'
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

        if (pillsList.includes(this.props.item.activity_type)) {
            this.props.navigation.navigate(paths.Pills, {
                tasks_id: this.props.item.id,
                sender: this.props.item.activity_type,
            })
        } else {
            this.props.navigation.navigate(this.props.item.activity_type, {
                tasks_id: this.props.item.id,
            })
        }
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
