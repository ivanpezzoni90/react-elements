import React from 'react';
import styled from 'styled-components';
import { IconList, iconMap } from './constants/icons';
import { IconSize } from './types';

// https://react-icons.github.io/react-icons/icons?name=fa

const IconWrapper = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
`;

interface IconProps {
    icon?: IconList | string,
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
    const IconComponent = iconMap[icon as IconList | string];
    return (
        <IconWrapper
            className='ie-icon'
            onClick={(onClick)}
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

const defaultProps: IconProps = {
    icon: undefined,
    color: '#666',
    fontSize: IconSize.xs
};

Icon.defaultProps = defaultProps;

export { IconList, Icon};