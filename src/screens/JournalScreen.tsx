import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, StatusBar } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { backgroundColor, listUpdateInterval } from '../constants'
import { strings } from '../localization'
import { ActivityListItem } from '../components/ActivityListItem'
import { RootState } from '../redux/store'
import { Get } from '../requests/newRequest'
import { updateTasks, tasksFetchFailed } from '../redux/actions'
import { NavigationStackScreenComponent } from 'react-navigation-stack'

export const JournalScreen: NavigationStackScreenComponent = ({
    navigation,
}) => {
    const [isActive, setIsActive] = useState(false)

    const activity = useSelector((state: RootState) => state.activity)
    const user = useSelector((state: RootState) => state.user)
    const settings = useSelector((state: RootState) => state.settings)
    const tokens = useSelector((state: RootState) => state.tokens)
    const dispatch = useDispatch()

    const fetch = () => {
        const url = settings.idinvFilter
            ? `idinv/${user.idinv}/activity`
            : `users/${user._id}/activity`
        Get(url, tokens.access_token)
            .then(res => dispatch(updateTasks(res)))
            .catch(err => dispatch(tasksFetchFailed()))
    }

    useEffect(() => {
        if (!isActive) return
        // when the screen is active, we run fetch on interval
        const intervalId = setInterval(() => fetch(), listUpdateInterval)

        return () => {
            clearInterval(intervalId)
        }
    }, [isActive])

    useEffect(() => {
        const focusSub = navigation.addListener('willFocus', () => {
            fetch()
            setIsActive(true)
        })
        const blurSub = navigation.addListener('willBlur', () => {
            setIsActive(false)
        })

        return () => {
            focusSub.remove()
            blurSub.remove()
        }
    }, [])

    const renderItem = ({ item }) => {
        return <ActivityListItem activity={item} navigation={navigation} />
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'white'} barStyle="dark-content" />
            <FlatList
                style={styles.list}
                data={activity}
                contentContainerStyle={{ paddingBottom: 30 }}
                overScrollMode={'always'}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

JournalScreen.navigationOptions = ({ navigation }) => {
    return {
        title: strings.Journal,
    }
}

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
