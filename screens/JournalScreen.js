import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    StatusBar,
} from 'react-native'
import { connect } from 'react-redux'
import { backgroundColor } from '../properties'
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
    }

    componentDidUpdate() {
        // this.forceUpdate()
        // TODO: check here
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', this.runSync)
        this.props.navigation.addListener('willBlur', () =>
            clearInterval(this.intervalId),
        )

        this.intervalId = setInterval(() => {
            this.runSync()
        }, 3000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    runSync() {
        sync(this.props.user.id, this.props.user.api_key)
    }

    _renderItem = ({ item, index }) => {
        if (item.system) if (item.system.awaitsDelete) return null
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
    }
}

const mapDispatchToProps = dispatch => ({
    fetchData: (id, api_key) => {
        dispatch(activityFetchData(id, api_key))
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
        paddingBottom: 25,
    },
    list: {
        flex: 1,
        top: 20,
    },
})
