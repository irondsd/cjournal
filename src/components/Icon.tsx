import React, { FC } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import IonIcons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Zocial from 'react-native-vector-icons/Zocial'
import { IconProps as VectorIconProps } from 'react-native-vector-icons/Icon'

export type Set =
    | 'IonIcons'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'AntDesign'
    | 'MaterialCommunityIcons'
    | 'Octicons'
    | 'Zocial'
    | 'SimpleLineIcons'

interface IconProps extends VectorIconProps {
    set?: Set
}

export const Icon: FC<IconProps & { set: Set }> = ({
    set = 'FontAwesome5',
    ...props
}) => {
    switch (set) {
        case 'FontAwesome':
            return <FontAwesome {...props} />
        case 'FontAwesome5':
            return <FontAwesome5 {...props} />
        case 'AntDesign':
            return <AntDesign {...props} />
        case 'MaterialCommunityIcons':
            return <MaterialCommunityIcons {...props} />
        case 'IonIcons':
            return <IonIcons {...props} />
        case 'MaterialCommunityIcons':
            return <MaterialCommunityIcons {...props} />
        case 'SimpleLineIcons':
            return <SimpleLineIcons {...props} />
        case 'Octicons':
            return <Octicons {...props} />
        case 'Zocial':
            return <Zocial {...props} />
        default:
            return <FontAwesome {...props} name="question" />
    }
}
