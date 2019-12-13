import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../properties'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import HappyTile from '../../components/tiles/HappyTile'
import SadnessTile from '../../components/tiles/SadnessTile'
import AngerTile from '../../components/tiles/AngerTile'
import FearTile from '../../components/tiles/FearTile'
import ExcitementTile from '../../components/tiles/ExcitementTile'
import AnxietyTile from '../../components/tiles/AnxietyTile'

type Props = {}
class EmotionsScreen extends Component<Props> {
    static navigationOptions = {
        title: strings.Influence,
    }

    render() {
        return (
            <View style={styles.activityBox}>
                <HappyTile navigation={this.props.navigation} />
                <SadnessTile navigation={this.props.navigation} />
                <AngerTile navigation={this.props.navigation} />
                <FearTile navigation={this.props.navigation} />
                <ExcitementTile navigation={this.props.navigation} />
                <AnxietyTile navigation={this.props.navigation} />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, null)(EmotionsScreen)

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
