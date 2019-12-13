import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../properties'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import ArrhythmiaTile from '../../components/tiles/ArrhythmiaTile'
import PalpitationTile from '../../components/tiles/PalpitationTile'

class IntakeScreen extends Component {
    static navigationOptions = {
        title: strings.CardiacRhythmDisturbance,
    }

    render() {
        return (
            <View style={styles.activityBox}>
                <ArrhythmiaTile navigation={this.props.navigation} />
                <PalpitationTile navigation={this.props.navigation} />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, null)(IntakeScreen)

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
