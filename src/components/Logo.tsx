import React from 'react'
import LogoSVG from '../resources/svg/logo.svg'

interface LogoProps {
    fill?: string
    size: number
}

export const Logo: React.FC<LogoProps> = ({ fill = '#FFFFFF', size = 100 }) => {
    const props = {
        width: size,
        height: size,
        fill,
    }

    return <LogoSVG {...props} />
}
