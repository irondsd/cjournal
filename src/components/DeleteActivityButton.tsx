import React from 'react'
import { TouchableIcon } from './TouchableIcon'

type DeleteActivityButtonProps = {
    onPress: () => void
}

export const DeleteActivityButton: React.FunctionComponent<DeleteActivityButtonProps> =
    ({ onPress }) => {
        return (
            <TouchableIcon
                name="trash"
                color="#000"
                size={20}
                set="FontAwesome5"
                style={{ margin: 15 }}
                onPress={onPress}
            />
        )
    }
