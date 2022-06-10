import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { generateID, mergeClasses } from '../helpers';
import { ChangeElementValueType, ElementLength, IconSize, PropsObjectInterface, SetBoolToStateType, ToggleLabelType } from '../types';
import Element from './Element';
import { AlignPositions, LabelPositions } from '../types';
import Icon, {IconList} from '../ui/Icon';
import { allColors } from '../constants/colors';

interface Slider {
    toggle: boolean,
    color?: string,
    colorOff?: string
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
        left: 1px;
        bottom: 1px;

        width: 20px;
        height: 20px;
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
    width: 48px;
    height: 24px;
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
    shadow?: boolean
}
const SwitchToggleAdvancedWrapper = styled.div<SwitchToggleAdvancedWrapperInterface>`
    display: flex;
    align-items: center;
    min-width: 7em;
    width: ${props => props.length};
    height: 3.5em;
    position: relative;
    background-color: rgba(255, 255, 255, 0.3);
    border: none;
    border-bottom: 1px solid #666;
    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;
    background-color: #ffffff;
    ${({shadow}) => shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);' : ''}

    &:hover{
        background-color: rgba(255, 255, 255, 0.45);
        ${({shadow}) => shadow ? 'box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);' : ''}
    }
`;

interface LabelProps {
    htmlFor: string
    length: ElementLength
}

const SwitchToggleAdvancedLabel = styled.div<LabelProps>`
    display: flex;
    justify-content: flex-start;
    flex: 1;
    padding: 0 1em 0 1em;

    font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: #666;
    opacity: 1;
    pointer-events: none;
    transition: 0.1s all ease-in-out;

    max-width: ${({length}) => length};
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
`;

interface SwitchToggleProps extends PropsObjectInterface {
    checked: boolean,
    className: string,
    color?: string,
    label?: string,
    simpleElement?: boolean,
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
                />
                <Slider
                    {...{ toggle, color, colorOff }}
                    className="ie-radio__element__slider"
                    onClick={onClickCb}
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
        simpleElement,
        align,
        labelType,
        labelOn,
        labelOff,
        shadow,
        length,
        onChange
    } = props;

    const id = useRef(generateID());

   
    return (
        <Fragment>
            {simpleElement ? (
                <Element
                    className={mergeClasses('ie-radio', className)}
                    id={id.current}
                    align={align}
                    label={label}
                    labelPosition={labelPosition}
                >
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
                </Element>
            ): (
                <SwitchToggleAdvancedWrapper
                    shadow={shadow}
                    length={length}
                    className={mergeClasses('ie-radio', className)}
                >
                    <SwitchToggleAdvancedLabel
                        className="ie-radio__label"
                        htmlFor={id.current}
                        length={length}
                    >
                        {label}
                    </SwitchToggleAdvancedLabel>
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
            )}
        </Fragment>
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
    labelPosition: undefined,
    simpleElement: false,
    labelOn: 'YES',
    labelOff: 'NO',
    shadow: true,
    labelType: ToggleLabelType.label,
    length: ElementLength.m,
    onChange: () => {}
};

SwitchToggle.defaultProps = defaultProps;
SwitchToggleElement.defaultProps = defaultProps;

export default SwitchToggle;

export { SwitchToggleElement };