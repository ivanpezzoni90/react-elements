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
    cursor?: Cursors,
    shadow?: boolean
}

const IconWrapper = styled.div<IconWrapperInterface>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;

    cursor: ${props => props.cursor};

    background-color: ${props => props.backgroundColor};
    border-radius: ${props => props.borderRadius};
    padding: ${props => props.padding};

    ${props => props.shadow ? `box-shadow: rgb(0 0 0 / 20%) 0px 3px 5px -1px,
        rgb(0 0 0 / 14%) 0px 6px 10px 0px,
        rgb(0 0 0 / 12%) 0px 1px 18px 0px;` : ''}
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
    shadow?: boolean,
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
    shadow,
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
            shadow={shadow}
            onClick={(onClick)}
        >
            {IconComponent ? (
                <IconComponent
                    style={{
                        color,
                        fontSize
                    }} 
                />
            ) : null}
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
    cursor: Cursors.auto,
    shadow: false,
};

Icon.defaultProps = defaultProps;

export { Icon };