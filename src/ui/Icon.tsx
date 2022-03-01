import React from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { IoCloseSharp, IoCheckmarkSharp } from "react-icons/io5";

import { IconType } from 'react-icons/lib';

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

function Icon({
    icon,
    color,
    fontSize,
}: {
    icon: string,
    color?: string,
    fontSize?: string
}) {
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

export default Icon;

export { IconList };