import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, appColor } from '../../properties'
import { strings } from '../../localizations'
import sync from '../../services/sync'
import OrthostasisTile from '../../components/tiles/OrthostasisTile'
import OneTimeTakingofMedicineTile from '../../components/tiles/OneTimeTakingOfMedicineTile'

type Props = {}
class TestsAcreen extends Component<Props> {
    static navigationOptions = {
        title: strings.Activity,
    }

    render() {
        return (
            <View style={styles.activityBox}>
                {this.props.user.hide_elements.includes(
                    'Orthostasis',
                ) ? null : (
                    <OrthostasisTile navigation={this.props.navigation} />
                )}
                <OneTimeTakingofMedicineTile
                    navigation={this.props.navigation}
                />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, null)(TestsAcreen)

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
