import React from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { IoCloseSharp, IoCheckmarkSharp } from 'react-icons/io5';

import { IconType } from 'react-icons/lib';
import { IconSize, PropsObjectInterface } from '../types';

// https://react-icons.github.io/react-icons/icons?name=fa

interface IconInterface {
    [key: string]: IconType
}
enum IconList {
    caretDown = 'caret-down',
    caretUp = 'caret-up',
    check = 'check',
    close = 'close'
}

const iconMap: IconInterface = {
    [IconList.caretDown]: FaCaretDown,
    [IconList.caretUp]: FaCaretUp,
    [IconList.close]: IoCloseSharp,
    [IconList.check]: IoCheckmarkSharp
};

interface IconProps extends PropsObjectInterface {
    icon: IconList | string,
    color?: string,
    fontSize?: IconSize | string
}

function Icon({
    icon,
    color,
    fontSize,
}: IconProps) {
    const IconComponent = iconMap[icon];
    return (
        <IconComponent
            style={{
                color,
                fontSize
            }} 
        />
    );
}

const defaultProps: PropsObjectInterface = {
    icon: undefined,
    color: '#666',
    fontSize: IconSize.xs
};

Icon.defaultProps = defaultProps;

export default Icon;

export { IconList };