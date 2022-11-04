import React from 'react';
import styled from 'styled-components';
import { allColors } from './constants/colors';
import { getClickAnimationStyles, lightenDarkenColor, mergeClasses, setAlphaToHex } from './helpers';
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
    ButtonTypes
} from './types';
import { Icon } from './Icon';
import { IconList } from './constants/icons';

const calculateIconSize = (iconSize: ButtonIconSize, fontSize: ElementSize) => {
    const parsedFontSize = parseInt(fontSize, 10);
    const calculatedIconSize = iconSize * parsedFontSize;

    return `${calculatedIconSize}px`;
};

const standardButtonStyles = (props: ButtonElementProps) => `
    background-color: ${props.color};

    box-shadow: rgb(0 0 0 / 20%) 0px 3px 1px -2px,
        rgb(0 0 0 / 14%) 0px 2px 2px 0px,
        rgb(0 0 0 / 12%) 0px 1px 5px 0px;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;

    border: none;

    ${!props.disabled ? `
        &:hover {
            background-color: ${lightenDarkenColor(props.color as string, -30)};
            box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px -1px,
                rgb(0 0 0 / 14%) 0px 4px 5px 0px,
                rgb(0 0 0 / 12%) 0px 1px 10px 0px;
        }
    ` : ''}
`;

const outlineButtonStyles = (props: ButtonElementProps) => `
    background-color: ${allColors['Transparent']};
    border: 1px solid ${setAlphaToHex(props.color as string, 85)};

    ${!props.disabled ? `
        &:hover {
            background-color: ${setAlphaToHex(props.color as string, 5)};
            border: 1px solid ${props.color};
        }
    ` : ''}
`;

const textOnlyButtonStyles = (props: ButtonElementProps) => `
    background-color: ${allColors['Transparent']};
    border: none;

    ${!props.disabled ? `
        &:hover {
            background-color: ${setAlphaToHex(props.color as string, 10)};
        }
    ` : ''}
`;

const getButtonTypeStyles = (props: ButtonElementProps) => {
    switch(props.buttonType) {
        case ButtonTypes.standard:
        default:
            return standardButtonStyles(props);
        case ButtonTypes.outline:
            return outlineButtonStyles(props);
        case ButtonTypes.textOnly:
            return textOnlyButtonStyles(props);
    }
};

const ButtonElement = styled.button<ButtonElementProps>`
    display: flex;
    align-items: center;

    ${props => getButtonTypeStyles(props)}

    ${props => getClickAnimationStyles(
        props.clickAnimation as boolean,
        props.color as string,
        props.buttonType === ButtonTypes.standard ? 90 : 20)}

    justify-content: ${props => props.align};
    width: ${props => props.length};
    height: ${props => props.height};
    padding: ${props => props.padding};
    border-radius: ${props => props.borderRadius};
    
    color: ${props => props.textColor};
    font-size: ${props => props.fontSize};
    font-weight: ${props => props.fontWeight};

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
    align?: AlignPositions,
    color?: string,
    buttonType?: ButtonTypes,
    clickAnimation?: boolean
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
    align?: AlignPositions,
    type?: ButtonTypes,
    clickAnimation?: boolean
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
    type,
    clickAnimation,
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
            buttonType={type}
            clickAnimation={clickAnimation}
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
    length: ElementLength.s,
    height: ElementHeight.s,
    icon: undefined,
    iconColor: allColors['White'],
    buttonIconSize: ButtonIconSize.auto,
    elementPosition: ElementPosition.left,
    align: AlignPositions.center,
    type: ButtonTypes.standard,
    clickAnimation: true
};

Button.defaultProps = defaultProps;

export { Button };