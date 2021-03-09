import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor, listUpdateInterval } from '../constants'
import { strings } from '../localization'
import ActivityListItem from '../components/ActivityListItem'
import {
    activityFetchFailed,
    deleteActivity,
    updateActivities,
} from '../redux/actions/activityActions'
import sync from '../services/sync'
import store from '../redux/store'
import syncActivities from '../services/syncActivities'
import { Get } from '../requests/newRequest'

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
        syncActivities(
            this.props.activity,
            this.props.user._id,
            this.props.tokens.access_token,
        ).then(() => {
            const url = this.props.idinvFilter
                ? `idinv/${this.props.user.idinv}/activity`
                : `users/${this.props.user._id}/activity`
            Get(url, this.props.tokens.access_token)
                .then(res => {
                    store.dispatch(updateActivities(res))
                })
                .catch(err => store.dispatch(activityFetchFailed()))
        })
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
    fetchData: (_id, access_token) => {
        dispatch(activityFetchData(_id, access_token))
    },
    fetchIdinv: (idinv, access_token) => {
        dispatch(activityFetchIdinv(idinv, access_token))
    },
    removeDeleted: activity => {
        dispatch(deleteActivity(activity))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(JournalScreen)

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
