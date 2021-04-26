import React from 'react'
import FeelingGood from '../resources/svg/positiveemotions.svg'
import FeelingNormal from '../resources/svg/normal.svg'
import FeelingBad from '../resources/svg/negativeemotions.svg'

interface FeelingsIconProps {
    fill?: string
    size: number
    feeling: 'good' | 'bad' | 'normal'
}

export const FeelingsIcon: React.FC<FeelingsIconProps> = ({
    fill = '#FFFFFF',
    size = 100,
    feeling,
}) => {
    const props = {
        width: size,
        height: size,
        fill,
    }

    switch (feeling) {
        case 'good':
            return <FeelingGood {...props} />
        case 'bad':
            return <FeelingBad {...props} />
        case 'normal':
            return <FeelingNormal {...props} />
    }
}
