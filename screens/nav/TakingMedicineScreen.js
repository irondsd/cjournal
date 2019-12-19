import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../properties'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import CourseTherapyTile from '../../components/tiles/CourseTherapyTile'
import ReliefOfAttackTile from '../../components/tiles/ReliefOfAttackTile'
import TileWrapper from '../../components/TileWrapper'

export default class IntakeScreen extends Component {
    static navigationOptions = {
        title: strings.Pills,
    }

    render() {
        return (
            <TileWrapper>
                <CourseTherapyTile navigation={this.props.navigation} />
                <ReliefOfAttackTile navigation={this.props.navigation} />
            </TileWrapper>
        )
    }
}
