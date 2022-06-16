import React from 'react';
import { FaCaretDown, FaCaretUp, FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { IoCloseSharp, IoCheckmarkSharp } from 'react-icons/io5';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { IconType } from 'react-icons/lib';
import { IconSize, PropsObjectInterface } from '../types';

// https://react-icons.github.io/react-icons/icons?name=fa

interface IconInterface {
    [key: string]: IconType
}
enum IconList {
    caretDown = 'caret-down',
    caretUp = 'caret-up',
    caretLeft = 'caret-left',
    caretRight = 'caret-right',
    check = 'check',
    close = 'close',
    outlineClose = 'outline-close'
}

const iconMap: IconInterface = {
    [IconList.caretDown]: FaCaretDown,
    [IconList.caretUp]: FaCaretUp,
    [IconList.caretLeft]: FaCaretLeft,
    [IconList.caretRight]: FaCaretRight,
    [IconList.close]: IoCloseSharp,
    [IconList.check]: IoCheckmarkSharp,
    [IconList.outlineClose]: AiOutlineCloseCircle
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