import React from 'react';
import styled from 'styled-components';
import { allColors } from './constants/colors';
import { lightenDarkenColor, mergeClasses } from './helpers';
import {
    AlignPositions,
    BorderRadius,
    ButtonIconSize,
    ElementHeight,
    ElementLength,
    ElementSize,
    FontWeight,
    ElementPosition,
    Padding,
} from './types';
import { Icon } from './Icon';
import { IconList } from './constants/icons';

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
        pointer-events: none;
        cursor: not-allowed;`)
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

interface ButtonProps {
    className: string,
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
    elementPosition?: ElementPosition,
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
    className,
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
    elementPosition,
    onClick
}: ButtonProps) => {
    const calculatedIconSize = calculateIconSize(
        buttonIconSize as ButtonIconSize,
        fontSize as ElementSize
    );

    const IconElement = (<Icon
        className="ie-button__icon"
        icon={icon}
        color={iconColor}
        fontSize={calculatedIconSize}
    />);

    return (
        <ButtonElement
            className={mergeClasses('ie-button', className)}
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
            {icon && elementPosition === ElementPosition.left && IconElement}
            <LabelWrapper
                className="ie-button__label"
                length={length}
            >
                {label}
            </LabelWrapper>
            {icon && elementPosition === ElementPosition.right && IconElement}
        </ButtonElement>
    );
};

const defaultProps: ButtonProps = {
    className: '',
    padding: Padding.m,
    borderRadius: BorderRadius.s,
    color: allColors['Firebrick'],
    textColor: allColors['White'],
    fontSize: ElementSize.s,
    fontWeight: FontWeight.light,
    label: 'Label',
    disabled: false,
    onClick: () => {},
    length: ElementLength.full,
    height: ElementHeight.s,
    icon: undefined,
    iconColor: allColors['White'],
    buttonIconSize: ButtonIconSize.auto,
    elementPosition: ElementPosition.left,
    align: AlignPositions.center
};

Button.defaultProps = defaultProps;

export { Button };