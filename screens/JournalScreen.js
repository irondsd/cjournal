import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, listUpdateInterval } from '../constants'
import { strings } from '../localizations'
import { activityFetchData } from '../requests/activityFetchData'
import ActivityListItem from '../components/ActivityListItem'
import { deleteActivity } from '../redux/actions/activityActions'
import sync from '../services/sync'
import store from '../redux/store'

type Props = {}
class JournalScreen extends Component<Props> {
    static navigationOptions = {
        title: strings.Journal,
    }

    constructor(props) {
        super(props)
        this.runSync = this.runSync.bind(this)
        store.subscribe(() => {
            this.forceUpdate()
        })

        this.active = false
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', () => {
            this.runSync()
            this.active = true
        })
        this.props.navigation.addListener('willBlur', () => {
            this.active = false
        })

        this.updates()
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    updates() {
        this.intervalId = setInterval(() => {
            if (this.active) {
                this.runSync()
            }
        }, listUpdateInterval)
    }

    runSync() {
        sync(this.props.user.id, this.props.tokens)
    }

    _renderItem = ({ item, index }) => {
        if (item.system) if (item.system.awaitsDelete) return null

        // idinv filter implemented
        if (this.props.idinvFilter) {
            if (item.idinv !== this.props.user.idinv) {
                return null
            }
        }

        return (
            <ActivityListItem item={item} navigation={this.props.navigation} />
        )
    }

    render() {
        this.props.activity ? (list = [...this.props.activity]) : (list = [])
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={'white'}
                    barStyle="dark-content"
                    // hidden={true}
                />
                <FlatList
                    style={styles.list}
                    data={list}
                    renderItem={this._renderItem}
                    contentContainerStyle={{ paddingBottom: 30 }}
                    overScrollMode={'always'}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        activity: state.activity,
        tokens: state.tokens,
        idinvFilter: state.settings.idinvFilter,
    }
}

const mapDispatchToProps = dispatch => ({
    fetchData: (id, access_token) => {
        dispatch(activityFetchData(id, access_token))
    },
    removeDeleted: activity => {
        dispatch(deleteActivity(activity))
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(JournalScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
    },
    list: {
        flex: 1,
        paddingTop: 10,
        flexGrow: 1,
        paddingBottom: 20,
    },
})
