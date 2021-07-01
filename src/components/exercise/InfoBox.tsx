import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

type InfoBoxProps = {
    info: any
}

export const InfoBox: FC<InfoBoxProps> = ({ info }) => {
    return (
        <View style={styles.container}>
            {Object.keys(info).map((key, index) => {
                return (
                    <>
                        <View key={key} style={styles.infoBox}>
                            <Text style={styles.title}>{key}</Text>
                            <Text style={styles.value}>{info[key]}</Text>
                        </View>
                        {Object.keys(info).length - 1 !== index ? (
                            <View style={styles.divider} />
                        ) : null}
                    </>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        height: 50,
    },
    infoBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        width: 2,
        height: '100%',
        backgroundColor: '#dddddd',
    },
    title: {
        fontSize: 15,
    },
    value: {
        fontSize: 25,
    },
})
