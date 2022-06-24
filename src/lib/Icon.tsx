import React from 'react';
import styled from 'styled-components';
import { FaCaretDown, FaCaretUp, FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { IoCloseSharp, IoCheckmarkSharp } from 'react-icons/io5';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { IconType } from 'react-icons/lib';
import { IconSize, PropsObjectInterface } from './types';

// https://react-icons.github.io/react-icons/icons?name=fa

const IconWrapper = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
`;

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
    fontSize?: IconSize | string,
    onClick?: () => void
}

function Icon({
    icon,
    color,
    fontSize,
    onClick
}: IconProps) {
    const IconComponent = iconMap[icon];
    return (
        <IconWrapper
            onClick={onClick}
        >
            <IconComponent
                style={{
                    color,
                    fontSize
                }} 
            />
        </IconWrapper>
    );
}

const defaultProps: PropsObjectInterface = {
    icon: undefined,
    color: '#666',
    fontSize: IconSize.xs
};

Icon.defaultProps = defaultProps;

export { IconList, Icon};