import React, { ReactElement, useRef, useState } from 'react';
import styled from 'styled-components';
import { generateID, mergeClasses } from './helpers';
import {
    BorderRadius,
    Cursors,
    ElementSize,
    LabelLength,
    LabelPositions,
    Option,
    Padding,
    Positions,
    RadioTypes
} from './types';
import { CheckboxElement } from './Checkbox';
import { SwitchToggleElement } from './SwitchToggle';
import { Icon, IconList } from './Icon';
import { allColors } from './constants/colors';

interface LabelProps {
    htmlFor: string,
    labelColor?: string,
    labelPosition?: LabelPositions,
    labelLength?: LabelLength
}

const Label = styled.div<LabelProps>`
    display: flex;
    justify-content: flex-start;
    ${props => props.labelPosition === LabelPositions.vertical ? 'flex: 1;' : 'align-items: center;'}
    padding: 0 1em 0 1em;
    max-width: ${props => props.labelLength};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: ${props => props.labelColor};
    opacity: 1;
    pointer-events: none;
    transition: 0.1s all ease-in-out;
`;
interface RadioWrapperInterface {
    labelPosition?: LabelPositions,
}
const RadioWrapper = styled.div<RadioWrapperInterface>`
    display: flex;
    flex-direction: ${props => props.labelPosition === LabelPositions.horizontal ? 'row' : 'column'};
    padding: 0.5em;
`;

interface RadioContainerInterface {
    position: Positions,
}
const RadioContainer = styled.div<RadioContainerInterface>`
    display: flex;
    ${({position}) => position === Positions.horizontal
        ? `
            flex-direction: row;
        `
        : ''}
    ${({position}) => position === Positions.vertical
        ? `
            flex-direction: column;
            max-width: 8em;
        `
        : ''}
    padding-left: 1.5em;
`;

interface RadioElementInterface {
    key: string,
    type: RadioTypes
}

const RadioElement = styled.div<RadioElementInterface>`
    display: flex;
    align-items: center;
    padding: 0.25em ${({type}) => type === RadioTypes.icon ? '1em' : '0'} 0.25em 0;
`;

const RadioLabel = styled.div`
    padding: 0 1em 0 0;
    font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    color: #666;

    display: flex;
    flex: 1;

    max-width: 6em;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

interface RadioProps {
    className: string,
    label: string,
    position: Positions,
    value: string | number | boolean,
    type: RadioTypes,
    options: Array<Option>,
    labelPosition?: LabelPositions,
    labelLength?: LabelLength,
    hideLabel?: boolean,
    labelColor?: string,
    onChange: (v: string | number | boolean) => void
}

type getRadioElementType = (
    o: Option,
    type: RadioTypes,
    value: string | number | boolean,
    onRadioChange: (value: string | number | boolean) => void
) => ReactElement;

const getRadioElement: getRadioElementType = (
    o,
    type,
    value,
    onRadioChange
) => {
    let element: ReactElement = <div></div>;
    switch(type) {
        case RadioTypes.checkbox:
            element = (<CheckboxElement
                className={'ie-radio__element__checkbox'}
                checked={value === o.value}
                onChange={() => {
                    onRadioChange(o.value);
                }}
            />);
            break;
        case RadioTypes.toggle:
            element = (<SwitchToggleElement
                checked={value === o.value}
                onChange={() => {
                    onRadioChange(o.value);
                }}
            />);
            break;
        case RadioTypes.icon:
            element = (<Icon
                icon={o.icon as IconList}
                borderRadius={BorderRadius.xxl}
                fontSize={ElementSize.m}
                color={allColors['Cultured']}
                backgroundColor={value === o.value ? allColors['Gray Web'] : allColors['Quick Silver']}
                cursor={Cursors.pointer}
                padding={Padding.s}
                onClick={() => {
                    onRadioChange(o.value);
                }}
            />);
            break;
        default:
            break;
    }
    return <RadioElement
        key={`key_${o.value}`}
        type={type}
        className="ie-radio__element"
    >
        <RadioLabel
            className="ie-radio__element__label"
        >
            {o.label}
        </RadioLabel>
        {element}
    </RadioElement>;
};

function Radio(props: RadioProps) {
    const {
        className,
        label,
        labelPosition,
        position,
        value: valueFromProps,
        type,
        options,
        hideLabel,
        labelColor,
        labelLength,
        onChange
    } = props;

    const id = useRef(generateID());
    const [value, setValue] = useState(valueFromProps);

    const onRadioChange = (newValue: string | number | boolean) => {
        setValue(newValue);
        onChange(newValue);
    };

    return (
        <RadioWrapper
            labelPosition={labelPosition}
            className={mergeClasses('ie-radio', className)}
        >
            {hideLabel ? null : (
                <Label
                    labelPosition={labelPosition}
                    className="ie-radio__label"
                    htmlFor={id.current}
                    labelColor={labelColor}
                    labelLength={labelLength}
                >
                    {label}
                </Label>
            )}
            <RadioContainer
                className="ie-radio__container"
                position={position}
            >
                {options.map((o) => getRadioElement(o, type, value, onRadioChange))}
            </RadioContainer>
        </RadioWrapper>
    );
}

const defaultProps: RadioProps = {
    className: '',
    label: 'Label',
    position: Positions.vertical,
    labelPosition: LabelPositions.vertical,
    labelLength: LabelLength.auto,
    value: '',
    type: RadioTypes.checkbox,
    options: [],
    labelColor: allColors['Dim Gray'],
    hideLabel: false,
    onChange: () => {}
};

Radio.defaultProps = defaultProps;

export { Radio };

export type { RadioProps };
