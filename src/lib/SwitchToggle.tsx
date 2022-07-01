import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { generateID, mergeClasses } from './helpers';
import {
    BorderRadius,
    ChangeElementValueType,
    ElementLength, 
    IconSize,
    LabelLength,
    PropsObjectInterface,
    SetBoolToStateType,
    ToggleLabelType
} from './types';
import { AlignPositions, LabelPositions } from './types';
import {IconList, Icon} from './Icon';
import { allColors } from './constants/colors';
import { useBodyFontSize } from './hooks';

interface Slider {
    toggle: boolean,
    color?: string,
    colorOff?: string,
    bodyFontSize: number
}
interface Switch {
    toggle: boolean,
    color?: string,
    colorOff?: string
}

const Slider = styled.span<Slider>`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ toggle, color, colorOff }) => (toggle ? color : colorOff)};
    border-radius: 15px;
    border: 1px solid gray;
    transition: 0.4s;

    display: flex;
    align-items: center;
    justify-content: ${({toggle}) => toggle ? 'flex-start' : 'flex-end'};

    &:before {
        content: "";

        position: absolute;
        left: ${({toggle}) => toggle ? '8px' : '2px'};
        bottom: 1px;

        width: ${({bodyFontSize}) => (bodyFontSize * 2) - 4}px;
        height: ${({bodyFontSize}) => (bodyFontSize * 2) - 4}px;
        border-radius: 100%;

        background-color: ${({ toggle, color, colorOff }) => (toggle ? colorOff : color)};

        transition: 0.4s;
    }
`;

const Input = styled.input`
  &:checked + ${Slider}:before {
    transform: translateX(23.4px);
  }
`;

const SwitchElementWrapper = styled.div`
    padding: 0 1em 0 0.25em;
`;

const Switch = styled.label<Switch>`
    position: relative;
    display: inline-block;
    width: 4em;
    height: 2em;
    background-color: ${({ toggle, color, colorOff }) => (toggle ? color : colorOff)};
    border-radius: 15px;
    transition: 0.4s;

    & ${Input} {
        opacity: 0;
        width: 0;
        height: 0;
    }
`;

interface SwitchToggleAdvancedWrapperInterface {
    length: ElementLength,
    shadow?: boolean,
    borderColor?: string,
    showBorders?: boolean,
    hideBottomBorder?: boolean,
    align?: AlignPositions,
    borderRadius?: BorderRadius,
    labelPosition?: LabelPositions,
}
const SwitchToggleAdvancedWrapper = styled.div<SwitchToggleAdvancedWrapperInterface>`
    display: flex;
    ${props => props.labelPosition === LabelPositions.vertical ? `
        flex-direction: column;
        padding-left: 0.5em;
        padding-bottom: 0.25em;
        align-items: ${props.align};
        justify-content: center;
    ` :`
        flex-direction: row;
        justify-content: ${props.align};
        align-items: center;
    `}
    min-width: 7em;
    width: ${props => props.length};
    height: ${props => props.labelPosition === LabelPositions.vertical ? '4em' : '3.5em'};
    position: relative;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: ${props => props.borderRadius};
    ${(props) => props.hideBottomBorder ? '' : `border-bottom: 1px solid ${props.borderColor};`}
    ${(props) => props.showBorders ? `border: 1px solid ${props.borderColor}` : ''};
    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;
    background-color: #ffffff;
    ${({shadow}) => shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);' : ''}

    &:hover{
        background-color: rgba(255, 255, 255, 0.45);
        ${({shadow}) => shadow ? 'box-shadow: 0px 4px 20px 0px  rgba(0, 0, 0, 0.05);' : ''}
    }
`;

interface LabelProps {
    htmlFor: string
    length: ElementLength,
    labelColor?: string,
    labelPosition?: LabelPositions,
    labelLength?: LabelLength
}

const SwitchToggleAdvancedLabel = styled.div<LabelProps>`
    display: flex;
    justify-content: flex-start;
    flex: 1;
    padding: 0 1em 0 ${props => props.labelPosition === LabelPositions.horizontal ? '1em' : '0'};

    font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: ${props => props.labelColor};
    opacity: 1;
    pointer-events: none;
    transition: 0.1s all ease-in-out;

    max-width: ${props => props.labelLength === LabelLength.auto
        ? props.length
        : props.labelLength};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

interface ToggleInnerLabelType {
    toggle: boolean,
    color?: string,
}

const ToggleInnerLabel = styled.div<ToggleInnerLabelType>`
    font-size: 9px;
    font-weight: 600;
    color: ${({ toggle, color }) => (toggle ? 'white' : color)};
    display: flex;
    flex: 0.5;
    justify-content: center;
    padding-${({toggle}) => toggle ? 'left' : 'right'}: 0.5em;
`;

interface SwitchToggleProps extends PropsObjectInterface {
    checked: boolean,
    className: string,
    color?: string,
    label?: string,
    labelPosition?: LabelPositions,
    align?: AlignPositions,
    labelOn?: string,
    labelOff?: string,
    labelType?: ToggleLabelType,
    onChange: ChangeElementValueType,
    colorOff?: string,
    iconColor?: string,
    iconOffColor?: string,
    length: ElementLength,
    borderColor?: string,
    showBorders?: boolean,
    hideBottomBorder?: boolean,
    labelColor?: string,
    hideLabel?: boolean,
    borderRadius?: BorderRadius,
    labelLength?: LabelLength
}

function SwitchToggleElement({
    checked,
    onChange,
    color,
    colorOff,
    iconColor,
    iconOffColor,
    labelOn,
    labelOff,
    labelType
}: {
    checked: boolean,
    color?: string,
    labelOn?: string,
    labelOff?: string,
    labelType?: ToggleLabelType,
    colorOff?: string,
    iconColor?: string,
    iconOffColor?: string,
    onChange: ChangeElementValueType
}) {
    const [
        toggle, setToggle
    ]: [
        toggle: boolean,
        setToggle: SetBoolToStateType
    ] = useState(checked);

    const onClickCb = useCallback(() => {
        setToggle(!toggle);
        onChange(!toggle);
    }, [onChange, toggle]);

    useEffect(() => {
        setToggle(checked);
    }, [checked]);

    const bodyFontSize = useBodyFontSize();

    return (
        <SwitchElementWrapper
            className="ie-radio__element-wrapper"
        >
            <Switch
                className="ie-radio__element"
                toggle={toggle}
                color={color}
            >
                <Input
                    {...{ color }}
                    className="ie-radio__element__input"
                    type="checkbox"
                    checked={toggle}
                    readOnly
                />
                <Slider
                    {...{ toggle, color, colorOff }}
                    className="ie-radio__element__slider"
                    onClick={onClickCb}
                    bodyFontSize={bodyFontSize}
                >
                    <ToggleInnerLabel
                        toggle={toggle}
                        color={color}
                        className="ie-radio__element__slider__label"
                    >
                        {labelType === ToggleLabelType.label
                            ? toggle ? labelOn : labelOff
                            : toggle
                                ? <Icon
                                    icon={IconList.check}
                                    color={iconColor}
                                    fontSize={IconSize.xs}
                                />
                                : <Icon
                                    icon={IconList.close}
                                    color={iconOffColor}
                                    fontSize={IconSize.xs}
                                />
                        }
                    </ToggleInnerLabel>
                </Slider>
            </Switch>
        </SwitchElementWrapper>
    );
}

const SwitchToggle = (props: SwitchToggleProps) => {
    const {
        className,
        checked,
        color,
        colorOff,
        iconColor,
        iconOffColor,
        label,
        labelPosition,
        labelLength,
        align,
        labelType,
        labelOn,
        labelOff,
        shadow,
        length,
        borderColor,
        showBorders,
        hideBottomBorder,
        borderRadius,
        labelColor,
        hideLabel,
        onChange
    } = props;

    const id = useRef(generateID());

    return (
        <SwitchToggleAdvancedWrapper
            align={align}
            shadow={shadow}
            length={length}
            borderColor={borderColor}
            showBorders={showBorders}
            hideBottomBorder={hideBottomBorder}
            borderRadius={borderRadius}
            labelPosition={labelPosition}
            className={mergeClasses('ie-radio', className)}
        >
            {hideLabel ? null : (
                <SwitchToggleAdvancedLabel
                    className="ie-radio__label"
                    htmlFor={id.current}
                    length={length}
                    labelColor={labelColor}
                    labelPosition={labelPosition}
                    labelLength={labelLength}
                >
                    {label}
                </SwitchToggleAdvancedLabel>
            )}
            <SwitchToggleElement
                checked={checked}
                color={color}
                labelOn={labelOn}
                labelOff={labelOff}
                labelType={labelType}
                colorOff={colorOff}
                iconColor={iconColor}
                iconOffColor={iconOffColor}
                onChange={onChange}
            />
        </SwitchToggleAdvancedWrapper>
    );
};

const defaultProps: PropsObjectInterface = {
    checked: true,
    className: '',
    color: allColors['Dim Gray'],
    colorOff: allColors['White'],
    iconColor: allColors['White'],
    iconOffColor: allColors['Dim Gray'],
    label: 'Label',
    labelPosition: LabelPositions.horizontal,
    labelOn: 'YES',
    labelOff: 'NO',
    shadow: true,
    labelType: ToggleLabelType.label,
    align: AlignPositions.center,
    length: ElementLength.m,
    borderColor: allColors['Silver Sand'],
    showBorders: false,
    hideBottomBorder: false,
    borderRadius: BorderRadius.no,
    labelColor: allColors['Dim Gray'],
    hideLabel: false,
    labelLength: LabelLength.auto,
    onChange: () => {}
};

SwitchToggle.defaultProps = defaultProps;
SwitchToggleElement.defaultProps = defaultProps;

export { SwitchToggleElement, SwitchToggle };