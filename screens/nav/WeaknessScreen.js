import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../properties'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import FaintTile from '../../components/tiles/FaintTile'
import StupefactionTile from '../../components/tiles/StupefactionTile'
import NauseaTile from '../../components/tiles/NauseaTile'
import VisionDisturbancesTile from '../../components/tiles/VisionDisturbancesTile'
import FatigueTile from '../../components/tiles/FatigueTile'

type Props = {}
class WeaknessScreen extends Component<Props> {
    static navigationOptions = {
        title: strings.Weakness,
    }

    render() {
        return (
            <View style={styles.activityBox}>
                <FaintTile navigation={this.props.navigation} />
                <StupefactionTile navigation={this.props.navigation} />
                <NauseaTile navigation={this.props.navigation} />
                <VisionDisturbancesTile navigation={this.props.navigation} />
                <FatigueTile navigation={this.props.navigation} />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, null)(WeaknessScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor,
    },
    activityBox: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: backgroundColor,
        justifyContent: 'center',
    },
})
