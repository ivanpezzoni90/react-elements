import React from 'react';
import styled from 'styled-components';
import { allColors } from './constants/colors';
import { lightenDarkenColor } from './helpers';
import {
    AlignPositions,
    BorderRadius,
    ButtonIconSize,
    ElementHeight,
    ElementLength,
    ElementSize,
    FontWeight,
    IconPosition,
    Padding,
    PropsObjectInterface
} from './types';
import { IconList, Icon } from './Icon';

const calculateIconSize = (iconSize: ButtonIconSize, fontSize: ElementSize) => {
    const parsedFontSize = parseInt(fontSize, 10);
    const calculatedIconSize = iconSize * parsedFontSize;

    return `${calculatedIconSize}px`;
};

const ButtonElement = styled.button<ButtonElementProps>`
    display: flex;
    align-items: center;
    justify-content: ${props => props.align};
    width: ${props => props.length};
    height: ${props => props.height};
    padding: ${props => props.padding};
    border-radius: ${props => props.borderRadius};
    background-color: ${props => props.color};
    ${props => !props.disabled ? `
        &:hover {
            background-color: ${lightenDarkenColor(props.color as string, -30)};
        }
    ` : ''}
    color: ${props => props.textColor};
    font-size: ${props => props.fontSize};
    font-weight: ${props => props.fontWeight};
    border: none;
    ${props => props.disabled
        ? (`opacity: 0.5;
        pointer-events: none,
        cursor: not-allowed`)
        : ''}
`;

interface ButtonElementProps {
    padding?: string
    borderRadius?: string
    textColor: string
    fontSize?: ElementSize | string,
    disabled?: boolean
    length: ElementLength,
    height?: ElementHeight,
    fontWeight?: FontWeight,
    align?: AlignPositions
}

interface ButtonProps extends PropsObjectInterface {
    padding?: Padding
    borderRadius?: BorderRadius
    color: string
    textColor: string
    fontSize?: ElementSize | string
    disabled?: boolean
    label: string
    fontWeight?: FontWeight,
    length: ElementLength,
    icon?: IconList,
    iconColor?: string,
    buttonIconSize?: ButtonIconSize,
    iconPosition?: IconPosition,
    height?: ElementHeight,
    align?: AlignPositions
    onClick: VoidFunction
}

const LabelWrapper = styled.div`
    padding: 0 0.25em 0 0.25em;
    max-width: ${({length}: {length: ElementLength}) => length};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const Button = ({
    padding,
    borderRadius,
    color,
    textColor,
    fontSize,
    fontWeight,
    disabled,
    label,
    length,
    icon,
    height,
    align,
    iconColor,
    buttonIconSize,
    iconPosition,
    onClick
}: ButtonProps) => {
    const calculatedIconSize = calculateIconSize(
        buttonIconSize as ButtonIconSize,
        fontSize as ElementSize
    );

    const IconElement = (<Icon
        icon={icon}
        color={iconColor}
        fontSize={calculatedIconSize}
    />);

    return (
        <ButtonElement
            align={align}
            padding={padding}
            borderRadius={borderRadius}
            color={color}
            textColor={textColor}
            fontSize={fontSize}
            fontWeight={fontWeight}
            length={length}
            disabled={disabled}
            height={height}
            onClick={onClick}
        >
            {icon && iconPosition === IconPosition.left && IconElement}
            <LabelWrapper
                length={length}
            >
                {label}
            </LabelWrapper>
            {icon && iconPosition === IconPosition.right && IconElement}
        </ButtonElement>
    );
};

const defaultProps: PropsObjectInterface = {
    padding: Padding.m,
    borderRadius: BorderRadius.s,
    color: allColors['Firebrick'],
    textColor: allColors['White'],
    fontSize: ElementSize.l,
    fontWeight: FontWeight.light,
    label: 'Label',
    disabled: false,
    onClick: () => {},
    length: ElementLength.full,
    height: ElementHeight.m,
    icon: undefined,
    iconColor: allColors['White'],
    buttonIconSize: ButtonIconSize.auto,
    iconPosition: IconPosition.left,
    align: AlignPositions.center
};

Button.defaultProps = defaultProps;

export { Button };