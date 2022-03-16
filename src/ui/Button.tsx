import React from 'react';
import styled from 'styled-components';
import { allColors } from '../constants/colors';
import { calculateElementLength, lightenDarkenColor } from '../helpers';
import { BorderRadius, ElementLength, ElementSize, FontWeight, IconPosition, IconSize, Padding, PropsObjectInterface } from '../types';
import Icon, { IconList } from './Icon';

const ButtonElement = styled.button<ButtonElementProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${props => calculateElementLength(props.length)};
    height: 3.5em;
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
    fontSize?: string
    disabled?: boolean
    length: ElementLength,
    fontWeight?: FontWeight
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
    iconSize?: IconSize,
    iconPosition?: IconPosition,
    onClick: VoidFunction
}

const LabelWrapper = styled.div`
    padding: 0 0.25em 0 0.25em;
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
    iconColor,
    iconSize, // TODO:
    iconPosition,
    onClick
}: ButtonProps) => {
    const IconElement = (<Icon
        icon={icon}
        color={iconColor}
        fontSize={fontSize}
    />);

    return (
        <ButtonElement
            padding={padding}
            borderRadius={borderRadius}
            color={color}
            textColor={textColor}
            fontSize={fontSize}
            fontWeight={fontWeight}
            length={length}
            disabled={disabled}
            onClick={onClick}
        >
            {icon && iconPosition === IconPosition.left && IconElement}
            <LabelWrapper>
                {label}
            </LabelWrapper>
            {icon && iconPosition === IconPosition.right && IconElement}
        </ButtonElement>
    );
};

Button.defaultProps = {
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
    icon: undefined,
    iconColor: allColors['White'],
    iconSize: IconSize.xs,
    iconPosition: IconPosition.left
};

export default Button;