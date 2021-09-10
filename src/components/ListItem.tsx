import React, { FC, ReactNode } from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import { strings } from '../localization'
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ActivityIcon from './ActivityIcon'
import { width } from '../constants'

interface ListItemProps {
    activity_type: string
    time: string
    info?: string
    onPress: () => void
    synced?: boolean
    icons?: ReactNode[]
}

export const ListItem: FC<ListItemProps> = ({
    activity_type,
    time,
    info,
    synced,
    icons,
    onPress,
}) => {
    return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            <View style={styles.img}>
                <ActivityIcon icon={activity_type} size={40} fill={'#000'} />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                <View style={{ maxWidth: '80%' }}>
                    <Text style={styles.title}>
                        {strings[activity_type as keyof typeof strings] ||
                            strings.UnknownActivity}
                    </Text>
                    <View style={styles.sub}>
                        {icons?.map((icon, idx) => icon)}
                        <Text style={styles.subtitle}>
                            {time}
                            {info ? ' - ' + info : null}
                        </Text>
                    </View>
                </View>
                {synced === false && (
                    <View style={styles.synced}>
                        <Icon name="repeat" color="#eeeeee" size={30} />
                    </View>
                )}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        width: '100%',
        flexDirection: 'row',
    },
    title: {
        fontSize: 20,
        textAlign: 'left',
        color: 'black',
        width: width - 50,
    },
    sub: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 13,
        textAlign: 'left',
        color: 'grey',
    },
    img: {
        marginLeft: 5,
        marginRight: 5,
    },
    synced: {
        flex: 1,
        alignItems: 'flex-end',
    },
    icon: {
        marginLeft: 3,
        marginRight: 3,
    },
})
