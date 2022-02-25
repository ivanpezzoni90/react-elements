import React from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

interface IconInterface {
    [key: string]: IconType
}
enum IconList {
    caretDown = 'caret-down',
    caretUp = 'caret-up'
}

const iconMap: IconInterface = {
    [IconList.caretDown]: FaCaretDown,
    [IconList.caretUp]: FaCaretUp
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