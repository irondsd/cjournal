import React, { FC, useState, useEffect, useMemo } from 'react'
import { StyleSheet, View, FlatList, StatusBar } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { backgroundColor, listUpdateInterval } from '../../constants'
import { strings } from '../../localization'
import { TasksListItem } from '../../components/TasksListItem'
import { Get } from '../../requests/newRequest'
import { useUser } from '../../context/userContext'
import { useAuth } from '../../context/authContext'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { HomeTabsParamList } from '../../navigation/HomeStack'
import { useTasks } from '../../context/tasksContext'
import { useSync } from '../../hooks/useSync'

type TasksScreenNavigationProp = StackNavigationProp<HomeTabsParamList, 'Tasks'>
type TasksScreenRouteProp = RouteProp<HomeTabsParamList, 'Tasks'>

type TasksScreenProps = {
    navigation: TasksScreenNavigationProp
    route: TasksScreenRouteProp
}
export const TasksScreen: FC<TasksScreenProps> = ({ navigation }) => {
    const [isActive, setIsActive] = useState(false)

    const { sorted } = useTasks()

    const { fetchTasks } = useSync()

    useEffect(() => {
        if (!isActive) return
        // when the screen is active, we run fetch on interval
        const intervalId = setInterval(() => fetchTasks(), listUpdateInterval)

        return () => {
            clearInterval(intervalId)
        }
    }, [isActive])

    useEffect(() => {
        const focusUnsub = navigation.addListener('focus', () => {
            fetchTasks()
            setIsActive(true)
        })
        const blurUnsub = navigation.addListener('blur', () => {
            setIsActive(false)
        })

        return () => {
            focusUnsub()
            blurUnsub()
        }
    }, [])

    const renderItem = ({ item }) => {
        return <TasksListItem task={item} navigation={navigation} />
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'white'} barStyle="dark-content" />
            <FlatList
                style={styles.list}
                data={sorted}
                contentContainerStyle={{ paddingBottom: 30 }}
                overScrollMode={'always'}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
        </View>
    )
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
