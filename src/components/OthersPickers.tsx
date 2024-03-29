import React, { FC, useState, useEffect } from 'react'
import { DropDownInput } from './DropDownInput'
import { loadHints, saveDefaultHints } from '../services/hints'
import { defaultHints } from '../constants/defaultHints'
import { strings } from '../localization'

export type OthersPickersProps = {
    activity_type: string
    open?: boolean
    maxLines?: number
    placeholder?: string
    value: string
    onChange: (value: string) => void
}

export const OthersPickers: FC<OthersPickersProps> = ({
    activity_type,
    open = false,
    maxLines = 5,
    placeholder = strings.hintPlaceholder,
    value,
    onChange,
}) => {
    const [options, setOptions] = useState<string[]>([])

    useEffect(() => {
        if (!activity_type) return
        loadHints(activity_type).then(res => {
            // load defaults
            if (res.length === 0) {
                saveDefaultHints(activity_type, defaultHints[activity_type])
                res = defaultHints[activity_type]
            }
            setOptions(res)
        })
    }, [activity_type])

    return (
        <DropDownInput
            options={options}
            open={open}
            maxLines={maxLines}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}
