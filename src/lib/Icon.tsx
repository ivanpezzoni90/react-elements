import React from 'react';
import styled from 'styled-components';
import { allColors } from './constants/colors';
import { IconList, iconMap } from './constants/icons';
import { mergeClasses } from './helpers';
import { BorderRadius, Cursors, IconSize, Padding } from './types';

// https://react-icons.github.io/react-icons/icons?name=fa

interface IconWrapperInterface {
    backgroundColor?: string,
    borderRadius?: BorderRadius,
    padding?: Padding,
    cursor?: Cursors
}

const IconWrapper = styled.div<IconWrapperInterface>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;

    cursor: ${props => props.cursor};

    background-color: ${props => props.backgroundColor};
    border-radius: ${props => props.borderRadius};
    padding: ${props => props.padding}
`;

interface IconProps {
    className: string,
    icon?: IconList | string,
    color?: string,
    fontSize?: IconSize | string,
    backgroundColor?: string,
    borderRadius?: BorderRadius,
    padding?: Padding,
    cursor?: Cursors,
    onClick?: () => void
}

function Icon({
    icon,
    color,
    fontSize,
    backgroundColor,
    borderRadius,
    padding,
    cursor,
    className,
    onClick
}: IconProps) {
    const IconComponent = iconMap[icon as IconList | string];
    return (
        <IconWrapper
            backgroundColor={backgroundColor}
            borderRadius={borderRadius}
            padding={padding}
            className={mergeClasses('ie-icon', className)}
            cursor={cursor}
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
    className: '',
    icon: undefined,
    color: allColors['Dim Gray'],
    fontSize: IconSize.xs,
    backgroundColor: allColors['Transparent'],
    borderRadius: BorderRadius.no,
    padding: Padding.no,
    cursor: Cursors.auto
};

Icon.defaultProps = defaultProps;

export { IconList, Icon};