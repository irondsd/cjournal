import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../constants'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import DyspneaTile from '../../components/tiles/DyspneaTile'
import TachypneaTile from '../../components/tiles/TachypneaTile'
import ArrhythmiaTile from '../../components/tiles/ArrhythmiaTile'
import PalpitationTile from '../../components/tiles/PalpitationTile'
import OtherComplaints from '../../components/tiles/OtherComplaints'
import TileWrapper from '../../components/TileWrapper'

export default class ComplaintsScreen extends Component<Props> {
    static navigationOptions = {
        title: strings.Complaints,
    }

    render() {
        return (
            <TileWrapper>
                <DyspneaTile navigation={this.props.navigation} />
                <TachypneaTile navigation={this.props.navigation} />
                <ArrhythmiaTile navigation={this.props.navigation} />
                <PalpitationTile navigation={this.props.navigation} />
                <OtherComplaints navigation={this.props.navigation} />
            </TileWrapper>
        )
    }
}
